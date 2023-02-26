import { AppDataSource } from "./../../../data-source.js";
import { User } from "../entities/user.entity.js";

export const UserRepository = AppDataSource.getRepository(User).extend({
  async existsByName(name: string) {
    return this.createQueryBuilder("user")
      .where("user.name = :name", { name })
      .getExists();
  },
});
