import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { AutoIdEntity } from "../../abstract/auto-id-entity.js";
import { TFollowStatus } from "../../constants.js";
import { User } from "../../user/entities/user.entity.js";

@Entity({ name: "follow" })
@Unique("unique_follow", ["follower", "followee"])
export class Follow extends AutoIdEntity {
  @ManyToOne(() => User)
  follower: User;

  @ManyToOne(() => User)
  followee: User;

  @Column("varchar")
  followStatus: TFollowStatus;
}
