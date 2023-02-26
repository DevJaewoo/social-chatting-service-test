import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { AutoIdEntity } from "../../abstract/auto-id-entity.js";
import { TFriendStatus } from "../../../global/constants.js";
import { User } from "../../user/entities/user.entity.js";

@Entity({ name: "friend" })
@Unique("unique_friend", ["user", "friend"])
export class Friend extends AutoIdEntity {
  @Column({ name: "userId" })
  userId: number;

  @Column({ name: "friendId" })
  friendId: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => User)
  friend: User;

  @Column("varchar")
  friendStatus: TFriendStatus;
}
