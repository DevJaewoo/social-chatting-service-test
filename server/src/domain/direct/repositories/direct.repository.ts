import { AppDataSource } from "../../../data-source.js";
import { Direct } from "../entities/direct.entity.js";

export const DirectRepository = AppDataSource.getRepository(Direct).extend({});
