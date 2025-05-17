import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Unique,
  JoinColumn,
} from "typeorm";
//entities
import { Users } from "./Users";
import { Posts } from "./Posts";

@Entity()
@Unique(["post", "user"]) // Prevent double voting
export class PostVotes {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Posts, (post) => post.votes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "post_id" }) // 👈 match DB
  post!: Posts;

  @ManyToOne(() => Users, (user) => user.votes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" }) // 👈 match DB
  user!: Users;

  @Column({ type: "boolean" })
  is_upvote!: boolean;

  @CreateDateColumn()
  created_at!: Date;
}
