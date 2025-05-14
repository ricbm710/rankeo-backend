import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Posts } from "./Posts";

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text", nullable: false })
  category_name!: string;

  @Column({ type: "text", nullable: false })
  category_type!: "post" | "option"; // enum constraint via check

  // necessary for some queries
  @OneToMany(() => Posts, (post) => post.category)
  posts!: Posts[];
}
