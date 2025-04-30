//jwt
import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "123456";

export function generateToken(
  payload: Record<string, any>,
  expiresIn: SignOptions["expiresIn"] = "1d"
): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
  // returns a JWT string such as: eyJhbGciOiJIUzI1NiIsInR5...etc
}

export function verifyToken(token: string): any {
  return jwt.verify(token, process.env.JWT_SECRET!);
  //   returns the decoded payload:
  //   {
  //     userId: 123,
  //     name: "Jane",
  //     iat: 1714441734,  // Issued At (UNIX timestamp)
  //     exp: 1714528134   // Expiration time
  //   }
}
