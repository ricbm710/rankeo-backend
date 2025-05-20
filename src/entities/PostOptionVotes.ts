import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
//entities
import { Users } from "./Users";
import { PostOptions } from "./PostOptions";

@Entity()
export class PostOptionVotes {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => PostOptions, (po) => po.votes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "post_option_id" })
  postOption!: PostOptions;

  @ManyToOne(() => Users, (user) => user.postOptionVotes, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "voted_by" })
  votedBy!: Users;

  @Column()
  is_upvote!: boolean;

  // -------------------------------------------------------->
}
