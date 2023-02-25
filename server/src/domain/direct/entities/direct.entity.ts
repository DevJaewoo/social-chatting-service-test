import { Entity, OneToMany } from "typeorm";
import { DirectUser } from "./direct-user.entity.js";
import { AutoIdEntity } from "../../abstract/auto-id-entity.js";
import { DirectChat } from "./direct-chat.entity.js";
import { User } from "../../user/entities/user.entity.js";

@Entity({ name: "direct" })
export class Direct extends AutoIdEntity {
  @OneToMany(() => DirectUser, (directUser) => directUser.direct, {
    lazy: true,
  })
  users: DirectUser[];

  @OneToMany(() => DirectChat, (directChat) => directChat.direct, {
    lazy: true,
  })
  messages: DirectChat[];
}
