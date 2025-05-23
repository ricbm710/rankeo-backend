//data-source
import { AppDataSource } from "../data-source";
//entities
import { Users } from "../entities/Users";
//dtos
import { CreateUserDTO } from "../dtos/createUser.dto";
//bcrypt
import bcrypt from "bcrypt";

export class UserService {
  private userRepo = AppDataSource.getRepository(Users);

  async createUser(data: CreateUserDTO): Promise<Users> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = this.userRepo.create({
      ...data,
      password_hash: hashedPassword,
    });

    return await this.userRepo.save(user);
  }

  async findByEmail(email: string): Promise<Users | null> {
    return await this.userRepo.findOneBy({ email });
  }

  async getUserProfile(userId: number): Promise<Users | null> {
    return await this.userRepo.findOne({
      where: { id: userId },
      relations: ["posts"],
    });
  }
}
