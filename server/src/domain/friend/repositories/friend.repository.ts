import { AppDataSource } from "../../../data-source.js";
import { FriendStatus } from "../../../global/constants.js";
import { Friend } from "../entities/friend.entity.js";

export const FriendRepository = AppDataSource.getRepository(Friend).extend({
  async findAllByUserId(id: number) {
    return this.createQueryBuilder("friend")
      .leftJoinAndSelect("friend.friend", "friendUser")
      .where("friend.userId = :id", { id })
      .andWhere("friend.friendStatus = :status", {
        status: FriendStatus.ACCEPTED,
      })
      .getMany();
  },
});
