//express
import { Request, Response } from "express";
//services
import { UserService } from "../services/user.service";

const userService = new UserService();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name, authProvider } = req.body;

    const existing = await userService.findByEmail(email);
    if (existing) {
      res.status(409).json({ message: "Email already registered." });
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
    console.error("User registration failed:", err);
    res.status(500).json({ message: "Something went wrong." });
  }
};
