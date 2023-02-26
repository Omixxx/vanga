import { db } from "../../config/db.server";

export class MangaService {

  async strictSearch(title: string) {
    return await db.manga.findMany({
      where: {
        titles: {
          some: {
            title: {
              contains: title,
            }
          }
        }
      },
      include: {
        titles: true,
        jpg: true,
      }
    })
  }

  async getRelated(id: number) {
    const query = await db.relation.findMany({
      where: {
        mangaId: id
      }
    })
    console.log(query)
    return query;
  }
}
