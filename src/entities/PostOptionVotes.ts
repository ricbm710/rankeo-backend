import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
//entities
import { Users } from "./Users";
import { PostOptions } from "./PostOptions";

@Entity()
export class PostOptionVotes {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => PostOptions, (po) => po.votes, { onDelete: "CASCADE" })
  postOption!: PostOptions;

  @ManyToOne(() => Users, (user) => user.postOptionVotes, {
    onDelete: "CASCADE",
  })
  votedBy!: Users;

  @Column()
  is_upvote!: boolean;

  // -------------------------------------------------------->
}
