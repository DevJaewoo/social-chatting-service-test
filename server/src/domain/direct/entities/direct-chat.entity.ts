import { Column, Entity, ManyToOne } from "typeorm";
import { AutoIdEntity } from "../../abstract/auto-id-entity.js";
import { DIRECT_CONSTANT } from "../../../global/constants.js";
import { User } from "../../user/entities/user.entity.js";
import { Direct } from "./direct.entity.js";

@Entity({ name: "direct_chat" })
export class DirectChat extends AutoIdEntity {
  @Column({ name: "userId" })
  userId: number;

  @Column({ name: "directId" })
  directId: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Direct)
  direct: Direct;

  @Column("varchar", { length: DIRECT_CONSTANT.MAX_MESSAGE_LENGTH })
  message: string;

  private constructor() {
    super();
  }

  public static create(
    user: User,
    direct: Direct,
    message: string
  ): DirectChat {
    const directChat = new DirectChat();
    directChat.user = user;
    directChat.direct = direct;
    directChat.message = message;
    return directChat;
  }
}
