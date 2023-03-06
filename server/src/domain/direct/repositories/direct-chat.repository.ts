import { AppDataSource } from "../../../data-source.js";
import { DirectChat } from "../entities/direct-chat.entity.js";

export const DirectChatRepository = AppDataSource.getRepository(
  DirectChat
).extend({
  async findAllByDirectId(directId: number) {
    return this.createQueryBuilder("directChat")
      .where("directChat.directId = :directID", { directId })
      .getMany();
  },
});
