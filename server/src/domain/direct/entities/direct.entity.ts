import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  Entity,
  OneToMany,
} from "typeorm";
import { DirectUser } from "./direct-user.entity.js";
import { AutoIdEntity } from "../../abstract/auto-id-entity.js";
import { DirectChat } from "./direct-chat.entity.js";
import { User } from "../../user/entities/user.entity.js";

@Entity({ name: "direct" })
export class Direct extends AutoIdEntity {
  @OneToMany(() => DirectUser, (directUser) => directUser.direct, {
    cascade: ["insert", "update", "remove"],
  })
  users: DirectUser[];

  @OneToMany(() => DirectChat, (directChat) => directChat.direct, {
    cascade: ["insert", "update", "remove"],
  })
  messages: DirectChat[];

  private constructor() {
    super();
  }

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  async nullChecks() {
    if (!this.users) this.users = [];
    if (!this.messages) this.messages = [];
  }

  private addDirectUser(directUser: DirectUser) {
    directUser.direct = this;
    this.users.push(directUser);
  }

  public static create(users: User[]): Direct {
    const direct = new Direct();
    direct.users = [];
    direct.messages = [];
    users.forEach((user) => DirectUser.create(user, direct));
    return direct;
  }
}
