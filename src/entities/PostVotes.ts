import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Unique,
} from "typeorm";
import { Users } from "./Users";
import { Posts } from "./Posts";

@Entity()
@Unique(["post", "user"]) // Prevent double voting
export class PostVotes {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Posts, (post) => post.votes, { onDelete: "CASCADE" })
  post!: Posts;

  @ManyToOne(() => Users, (user) => user.votes, { onDelete: "CASCADE" })
  user!: Users;

  @Column({ type: "boolean" })
  is_upvote!: boolean;

  @CreateDateColumn()
  created_at!: Date;
}
