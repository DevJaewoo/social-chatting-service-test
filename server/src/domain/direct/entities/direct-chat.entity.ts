import { Column, Entity, ManyToOne } from "typeorm";
import { AutoIdEntity } from "../../abstract/auto-id-entity.js";
import { DIRECT_CONSTANT } from "../../constants.js";
import { User } from "../../user/entities/user.entity.js";
import { Direct } from "./direct.entity.js";

@Entity({ name: "direct_chat" })
export class DirectChat extends AutoIdEntity {
  @ManyToOne(() => Direct)
  direct: Direct;

  @ManyToOne(() => User)
  user: User;

  @Column("varchar", { length: DIRECT_CONSTANT.MAX_MESSAGE_LENGTH })
  message: string;
}
