import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
//entities
import { Categories } from "./Categories";
import { PostOptions } from "./PostOptions";

@Entity()
export class Options {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  image_url!: string;

  @ManyToOne(() => Categories, (category) => category.options, {
    onDelete: "CASCADE",
  })
  category!: Categories;

  // -------------------------------------------------------->

  @OneToMany(() => PostOptions, (postOption) => postOption.option)
  postOptions!: PostOptions[];
}
