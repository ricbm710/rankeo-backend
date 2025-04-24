import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity("users")
@Unique(["email", "auth_provider"]) // Unique constraint for email + auth_provider
@Unique(["provider_id", "auth_provider"]) // Unique constraint for provider_id + auth_provider
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("text")
  name!: string; // Non-null assertion operator, says "I know it will be assigned"

  @Column("varchar", { length: 255, nullable: true })
  email!: string | null;

  @Column("text", { default: "local" })
  auth_provider!: string;

  @Column("text", { nullable: true })
  provider_id!: string | null;

  @Column("text", { nullable: true })
  password_hash!: string | null;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  member_since!: Date;
}
