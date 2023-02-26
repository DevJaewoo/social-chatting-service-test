import { AppDataSource } from "../../../data-source.js";
import { FollowStatus } from "../../../global/constants.js";
import { Follow } from "../entities/follow.entity.js";

export const FollowRepository = AppDataSource.getRepository(Follow).extend({
  async findAllFollowersByUserId(id: number) {
    return this.createQueryBuilder("follow")
      .leftJoinAndSelect("follow.follower", "follower")
      .where("follow.followeeId = :id", { id })
      .andWhere("follow.followStatus = :status", {
        status: FollowStatus.FOLLOWED,
      })
      .getMany();
  },

  async findAllFolloweesByUserId(id: number) {
    return this.createQueryBuilder("follow")
      .leftJoinAndSelect("follow.followee", "followee")
      .where("follow.followerId = :id", { id })
      .andWhere("follow.followStatus = :status", {
        status: FollowStatus.FOLLOWED,
      })
      .getMany();
  },
});
