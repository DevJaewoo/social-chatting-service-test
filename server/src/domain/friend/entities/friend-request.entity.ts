import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { AutoIdEntity } from "../../abstract/auto-id-entity.js";
import { TFriendRequestStatus } from "../../constants.js";
import { User } from "../../user/entities/user.entity.js";

@Entity({ name: "friend" })
@Unique("unique_friend", ["user", "friend"])
export class FriendRequest extends AutoIdEntity {
  @ManyToOne(() => User)
  from: User;

  @ManyToOne(() => User)
  to: User;

  @Column("varchar")
  status: TFriendRequestStatus;
}
