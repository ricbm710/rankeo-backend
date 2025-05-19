//typeorm
import { DataSource } from "typeorm";
//dotenv
import dotenv from "dotenv";
//entities
import { Users } from "./entities/Users";
import { Posts } from "./entities/Posts";
import { Categories } from "./entities/Categories";
import { PostVotes } from "./entities/PostVotes";
import { Options } from "./entities/Options";
import { PostOptions } from "./entities/PostOptions";
import { PostOptionVotes } from "./entities/PostOptionVotes";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: ["query", "error"],
  entities: [
    Users,
    Posts,
    Categories,
    PostVotes,
    Options,
    PostOptions,
    PostOptionVotes,
  ],
  // only required for resetting the TypeORM schema
  // dropSchema: true,
});

export const initializeDataSource = async () => {
  try {
    await AppDataSource.initialize();
    console.log("PostgreSQL connected successfully!");
  } catch (error) {
    console.error("Error during PostgreSQL connection", error);
  }
};
