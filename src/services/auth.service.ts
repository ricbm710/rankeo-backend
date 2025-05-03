//data-source
import { AppDataSource } from "../data-source";
//entities
import { Users } from "../entities/Users";
//DTOs
import { ValidateUserDTO } from "../dtos/validateUser";
//bcrypt
import bcrypt from "bcrypt";
//utils
import { generateToken } from "../utils/jwt";

export class AuthService {
  private userRepo = AppDataSource.getRepository(Users);

  async validateUser(data: ValidateUserDTO): Promise<string | null> {
    const user = await this.userRepo.findOneBy({
      email: data.email,
      auth_provider: "local",
    });

    if (!user || !user.password_hash) return null;

    const isValid = await bcrypt.compare(data.password, user.password_hash);
    if (!isValid) return null;

    // this is the user payload that I can retrieve later from the frontend
    return generateToken({
      userId: user.id,
      name: user.name,
      email: user.email,
    });
  }
}
