//data-source
import { AppDataSource } from "../data-source";
//entities
import { Posts } from "../entities/Posts";

export class PostService {
  private postRepo = AppDataSource.getRepository(Posts);
}
