import { Entity, Column, Unique, OneToMany } from "typeorm";
import { AutoIdEntity } from "../../abstract/auto-id-entity.js";
import { USER_CONSTANT } from "../../constants.js";
import { DirectUser } from "../../direct/entities/direct-user.entity.js";
import { Follow } from "../../follow/entities/follow.entity.js";

@Entity({ name: "user" })
@Unique("unique_name", ["name"])
@Unique("unique_nickname", ["nickname"])
export class User extends AutoIdEntity {
  @Column({
    type: "varchar",
    length: USER_CONSTANT.MAX_NAME_LENGTH,
  })
  name: string;

  @Column({
    type: "varchar",
    length: USER_CONSTANT.MAX_NICKNAME_LENGTH,
  })
  nickname: string;

  @Column({ type: "varchar" })
  password: string;

  @OneToMany(() => DirectUser, (directUser) => directUser.user, { lazy: true }) // 자신이 followee인 목록을 받아오기 때문
  directs: DirectUser;

  @OneToMany(() => Follow, (follow) => follow.followee, { lazy: true }) // 자신이 followee인 목록을 받아오기 때문
  followers: Follow[];

  @OneToMany(() => Follow, (follow) => follow.follower, { lazy: true }) // 자신이 follower인 목록을 받아오기 때문
  followees: Follow[];
}
