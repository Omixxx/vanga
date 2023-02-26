import { Anime } from "@prisma/client";
import { db } from "../../config/db.server";


export class AnimeService {

  async strictSearch(title: string) {
    return await db.anime.findMany({
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
        animeId: id
      }
    })
    console.log(query)
    return query;
  }
}
