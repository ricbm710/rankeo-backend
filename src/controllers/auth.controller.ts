//express
import { Request, Response } from "express";
//services
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await authService.validateUser({ email, password });

    if (!token) {
      res.status(401).json({ message: "Credenciales Inválidos." });
      return;
    }

    res.status(200).json({ token });
  } catch (err) {
    console.error("No se pudo iniciar sesión:", err);
    res.status(500).json({ message: "Error. Algo salió mal." });
  }
};
