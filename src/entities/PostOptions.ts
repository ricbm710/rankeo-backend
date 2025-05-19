// src/entities/PostOptions.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  Unique,
} from "typeorm";
//entities
import { Posts } from "./Posts";
import { Options } from "./Options";
import { Users } from "./Users";
import { PostOptionVotes } from "./PostOptionVotes";

@Entity()
@Unique(["post", "option"])
export class PostOptions {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Posts, (post) => post.postOptions, { onDelete: "CASCADE" })
  post!: Posts;

  @ManyToOne(() => Options, (option) => option.postOptions, {
    onDelete: "CASCADE",
  })
  option!: Options;

  @ManyToOne(() => Users, (user) => user.postOptionsAdded, {
    onDelete: "CASCADE",
  })
  addedBy!: Users;

  @CreateDateColumn()
  added_at!: Date;

  // -------------------------------------------------------->

  @OneToMany(() => PostOptionVotes, (vote) => vote.postOption)
  votes!: PostOptionVotes[];
}
