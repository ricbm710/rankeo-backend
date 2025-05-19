//typeorm
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from "typeorm";
//entities
import { PostVotes } from "./PostVotes";
import { Posts } from "./Posts";
import { PostOptions } from "./PostOptions";
import { PostOptionVotes } from "./PostOptionVotes";

@Entity()
@Unique(["email", "auth_provider"]) // Unique constraint on email + auth_provider
@Unique(["provider_id", "auth_provider"]) // Unique constraint on provider_id + auth_provider
export class Users {
  @PrimaryGeneratedColumn()
  id!: number; // Using '!' to mark this as definitely assigned

  @Column()
  name!: string;

  @Column({ type: "varchar", nullable: true })
  email!: string | null;

  @Column({ default: "local" })
  auth_provider!: string;

  @Column({ type: "varchar", nullable: true })
  provider_id!: string | null;

  @Column({ type: "varchar", nullable: true })
  password_hash!: string | null;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  member_since!: Date;

  @Column({ type: "varchar", nullable: true })
  image_string!: string | null;

  // -------------------------------------------------------->

  @OneToMany(() => Posts, (post) => post.creator)
  posts!: Posts[];

  @OneToMany(() => PostVotes, (vote) => vote.user)
  votes!: PostVotes[];

  @OneToMany(() => PostOptions, (postOption) => postOption.addedBy)
  postOptionsAdded!: PostOptions[];

  @OneToMany(() => PostOptionVotes, (vote) => vote.votedBy)
  postOptionVotes!: PostOptionVotes[];
}
