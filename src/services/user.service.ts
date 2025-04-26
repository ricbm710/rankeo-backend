import { AppDataSource } from "../data-source";
//entities
import { User } from "../entities/User";
//dtos
import { CreateUserDTO } from "../dtos/createUser.dto";
//bcrypt
import bcrypt from "bcrypt";

export class UserService {
  private userRepo = AppDataSource.getRepository(User);

  async createUser(data: CreateUserDTO): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.userRepo.create({
      ...data,
      password_hash: hashedPassword,
    });

    return await this.userRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOneBy({ email });
  }
}
