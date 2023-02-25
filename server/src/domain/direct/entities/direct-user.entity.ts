import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { User } from "../../user/entities/user.entity.js";
import { Direct } from "./direct.entity.js";

@Entity({ name: "direct_user" })
@Unique("unique_directuser", ["user", "direct"])
export class DirectUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user: User) => user.id)
  user: User;

  @ManyToOne(() => Direct, (direct: Direct) => direct.users)
  direct: Direct;

  @Column("datetime")
  lastNoticedAt: Date;
}
