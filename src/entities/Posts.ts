import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
// entities
import { Users } from "./Users";
import { Categories } from "./Categories";
import { PostVotes } from "./PostVotes";

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text", nullable: false })
  question!: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @Column({ type: "text", nullable: true })
  image_url!: string;

  @ManyToOne(() => Users, (user) => user.id, { nullable: false })
  @JoinColumn({ name: "created_by" })
  creator!: Users;

  @ManyToOne(() => Categories, (category) => category.posts, {
    nullable: false,
  })
  @JoinColumn({ name: "category_id" })
  category!: Categories;

  @OneToMany(() => PostVotes, (vote) => vote.post)
  votes!: PostVotes[];
}
