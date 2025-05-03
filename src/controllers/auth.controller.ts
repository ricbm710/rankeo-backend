//express
import { Request, Response } from "express";
//services
import { AuthService } from "../services/auth.service";
import { AuthenticatedRequest } from "../middleware/auth.middlware";

const authService = new AuthService();

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await authService.validateUser({ email, password });

    if (!token) {
      res.status(401).json({ message: "Credenciales Inválidos." });
      return;
    }

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    res.status(200).json({ message: "Sesión iniciada correctamente" });
  } catch (err) {
    console.error("No se pudo iniciar sesión:", err);
    res.status(500).json({ message: "Error. Algo salió mal." });
  }
};

export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  if (!req.user) {
    res.status(401).json({ message: "Usuario no autenticado." });
    return;
  }

  res.json({
    userId: req.user.userId,
    name: req.user.name,
    email: req.user.email,
  });
};
