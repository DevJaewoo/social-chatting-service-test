import { AppDataSource } from "../../../data-source.js";
import { Direct } from "../entities/direct.entity.js";

export const DirectRepository = AppDataSource.getRepository(Direct).extend({
  async findById(id: number) {
    return this.createQueryBuilder("direct")
      .where("direct.id = :id", { id })
      .getOne();
  },
});
