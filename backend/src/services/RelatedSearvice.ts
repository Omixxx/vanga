import { db } from "../../config/db.server";

export class RelatedService {

  async getRelated(id: number) {
    return await db.relation.findMany({
      where: {
        OR: [
          {
            animeId: id
          },
          {
            mangaId: id
          }
        ],
      }
    })
  }
}
