import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { AutoIdEntity } from "../../abstract/auto-id-entity.js";
import { USER_CONSTANT } from "../../constants.js";

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
}
