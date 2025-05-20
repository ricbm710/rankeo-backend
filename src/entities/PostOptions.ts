// src/entities/PostOptions.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  Unique,
  JoinColumn,
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
  @JoinColumn({ name: "post_id" })
  post!: Posts;

  @ManyToOne(() => Options, (option) => option.postOptions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "option_id" })
  option!: Options;

  @ManyToOne(() => Users, (user) => user.postOptionsAdded, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "added_by" })
  addedBy!: Users;

  @CreateDateColumn()
  added_at!: Date;

  // -------------------------------------------------------->

  @OneToMany(() => PostOptionVotes, (vote) => vote.postOption)
  votes!: PostOptionVotes[];
}
