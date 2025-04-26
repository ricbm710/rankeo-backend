import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
@Unique(["email", "auth_provider"]) // Unique constraint on email + auth_provider
@Unique(["provider_id", "auth_provider"]) // Unique constraint on provider_id + auth_provider
export class User {
  @PrimaryGeneratedColumn()
  id!: number; // Using '!' to mark this as definitely assigned

  @Column()
  name!: string;

  @Column({ nullable: true })
  email!: string | null;

  @Column({ default: "local" })
  auth_provider!: string;

  @Column({ nullable: true })
  provider_id!: string | null;

  @Column({ nullable: true })
  password_hash!: string | null;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  member_since!: Date;
}
