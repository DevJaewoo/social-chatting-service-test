import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { AutoIdEntity } from "../../abstract/auto-id-entity.js";
import { TFriendStatus } from "../../constants.js";
import { User } from "../../user/entities/user.entity.js";

@Entity({ name: "friend" })
@Unique("unique_friend", ["user", "friend"])
export class Friend extends AutoIdEntity {
  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => User)
  friend: User;

  @Column("varchar")
  status: TFriendStatus;
}
