import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
//entities
import { Posts } from "./Posts";
import { Options } from "./Options";

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text", nullable: false })
  category_name!: string;

  @Column({ type: "text", nullable: false })
  category_type!: "post" | "option"; // enum constraint via check

  // -------------------------------------------------------->

  @OneToMany(() => Posts, (post) => post.category)
  posts!: Posts[];

  @OneToMany(() => Options, (option) => option.category)
  options!: Options[];
}
