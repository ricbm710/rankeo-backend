//express
import { Request, Response } from "express";
//services
import { UserService } from "../services/user.service";
//middleware
import { AuthenticatedRequest } from "../middleware/auth.middleware";
//DTOs
import { toUserProfileDTO } from "../dtos/userProfile.dto";
import { PostService } from "../services/post.service";

const userService = new UserService();
const postService = new PostService();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name, authProvider } = req.body;

    const existing = await userService.findByEmail(email);
    if (existing) {
      res.status(409).json({ message: "Email ya existe." });
      return;
    }

    const newUser = await userService.createUser({
      email,
      password,
      name,
      authProvider,
    });
    res.status(201).json({ id: newUser.id, email: newUser.email });
  } catch (err) {
    console.error("No se pudo registrar el usuario:", err);
    res
      .status(500)
      .json({ message: "Error -> No se pudo registrar el usuario." });
  }
};

export const checkEmailExists = async (req: Request, res: Response) => {
  const { email } = req.query;

  if (typeof email !== "string") {
    res.status(400).json({ error: "Correo Inválido" });
    return;
  }
  try {
    const user = await userService.findByEmail(email);

    res.status(200).json({ exists: !!user });
  } catch (err) {
    console.error("No se pudo chequear el correo:", err);
    res
      .status(500)
      .json({ message: "Error -> No se pudo chequear el correo." });
  }
};

export const getFullUserProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Usuario no autenticado." });
      return;
    }

    const userId = Number(req.user.userId);

    const user = await userService.getUserProfile(userId);

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado." });
      return;
    }

    //user contains private data I don't need such as password & provider id
    //this converts user to UserProfileDTO
    const userDTO = toUserProfileDTO(user);
    res.status(200).json({ user: userDTO });
  } catch (err) {
    console.error("No se pudo conseguir el perfil:", err);
    res
      .status(500)
      .json({ message: "Error -> No se pudo conseguir el perfil." });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    res.status(400).json({ message: "Invalid user ID." });
    return;
  }

  try {
    const posts = await postService.getPostsWithVotes(
      1,
      "date",
      "DESC",
      userId
    ); // just filtering by userId
    res.json(posts);
  } catch (err) {
    console.error("No se pudo traer los rankings del usuario:", err);
    res
      .status(500)
      .json({ message: "Error -> No se pudo traer los rankings del usuario." });
  }
};
