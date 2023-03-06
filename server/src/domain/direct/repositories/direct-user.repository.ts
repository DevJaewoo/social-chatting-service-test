import { AppDataSource } from "../../../data-source.js";
import { DirectUser } from "../entities/direct-user.entity.js";

export const DirectUserRepository = AppDataSource.getRepository(
  DirectUser
).extend({
  async findByEachUserId(id1: number, id2: number) {
    return this.createQueryBuilder("user1")
      .leftJoin(DirectUser, "user2", "user1.directId = user2.directId")
      .where("user1.userId = :id1", { id1 })
      .andWhere("user2.userId = :id2", { id2 })
      .getOne();
  },
});
