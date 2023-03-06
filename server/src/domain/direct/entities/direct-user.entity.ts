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

  @Column({ name: "userId", nullable: true })
  userId: number;

  @Column({ name: "directId", nullable: true })
  directId: number;

  @ManyToOne(() => User, (user: User) => user.id)
  user: User;

  @ManyToOne(() => Direct, (direct: Direct) => direct.users)
  direct: Direct;

  @Column({ name: "datetime", nullable: true })
  lastNoticedAt: Date;

  private updateDirect(direct: Direct) {
    this.direct = direct;
    this.directId = direct.id;
    direct.users.push(this);
  }

  private updateUser(user: User) {
    this.user = user;
    this.userId = user.id;
    user.directs.push(this);
  }

  public static create(user: User, direct: Direct): DirectUser {
    const directUser = new DirectUser();
    directUser.updateUser(user);
    directUser.updateDirect(direct);
    directUser.lastNoticedAt = new Date(Date.now());
    return directUser;
  }
}
