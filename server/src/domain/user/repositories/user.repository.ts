import { AppDataSource } from "./../../../data-source.js";
import { User } from "../entities/user.entity.js";

export const UserRepository = AppDataSource.getRepository(User).extend({
  async existsByName(name: string) {
    return this.createQueryBuilder("user")
      .withDeleted()
      .where("user.name = :name", { name })
      .getExists();
  },

  async findByName(name: string) {
    return this.createQueryBuilder("user")
      .where("user.name = :name", { name })
      .getOne();
  },

  async findByIdWithRelationship(id: number) {
    return this.createQueryBuilder("user")
      .leftJoinAndSelect("user.friends", "friend")
      .leftJoinAndSelect("user.followers", "follower")
      .leftJoinAndSelect("user.followees", "followee")
      .where("user.id = :id", { id })
      .getOne();
  },
});
