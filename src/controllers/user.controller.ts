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
    console.error("Error en el registro de usuario:", err);
    res.status(500).json({ message: "Error. Algo salió mal." });
  }
};

export const checkEmailExists = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await userService.findByEmail(email);

    res.status(200).json({ exists: !!user });
  } catch (err) {
    console.error("Error en el chequeo del email:", err);
    res.status(500).json({ message: "Error. Algo salió mal." });
  }
};
