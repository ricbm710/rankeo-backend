import { Request, Response, NextFunction } from "express";
//utils
import { verifyToken } from "../utils/jwt";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    name: string;
    email: string;
  };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Express looks for the cookie that's created upon login
  const token = req.cookies.auth_token;
  // No cookie? No access
  if (!token) {
    res.status(401).json({ message: "No autorizado. Token faltante." });
    return;
  }

  try {
    const decoded = verifyToken(token) as AuthenticatedRequest["user"];
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token inválido o expirado." });
  }
};
