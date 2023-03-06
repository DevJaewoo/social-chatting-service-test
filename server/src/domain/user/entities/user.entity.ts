import {
  Entity,
  Column,
  Unique,
  OneToMany,
  AfterInsert,
  AfterLoad,
  AfterUpdate,
} from "typeorm";
import bcrypt from "bcrypt";
import { AutoIdEntity } from "../../abstract/auto-id-entity.js";
import { USER_CONSTANT } from "../../../global/constants.js";
import { DirectUser } from "../../direct/entities/direct-user.entity.js";
import { Follow } from "../../follow/entities/follow.entity.js";
import { Friend } from "../../friend/entities/friend.entity.js";

@Entity({ name: "user" })
@Unique("unique_name", ["name"])
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

  @OneToMany(() => DirectUser, (directUser) => directUser.user)
  directs: DirectUser[];

  @OneToMany(() => Follow, (follow) => follow.followee) // 자신이 followee인 목록을 받아오기 때문
  followers: Follow[];

  @OneToMany(() => Follow, (follow) => follow.follower) // 자신이 follower인 목록을 받아오기 때문
  followees: Follow[];

  @OneToMany(() => Friend, (friend) => friend.user)
  friends: Friend[];

  private constructor() {
    super();
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  async nullChecks() {
    if (!this.directs) this.directs = [];
    if (!this.followers) this.followers = [];
    if (!this.followees) this.followees = [];
    if (!this.friends) this.friends = [];
  }

  public static create = async (
    name: string,
    nickname: string,
    password: string
  ) => {
    const user = new User();
    user.name = name;
    user.nickname = nickname;

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);

    return user;
  };
}
