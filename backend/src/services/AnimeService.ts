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

  async searchById(id: number) {
    return await db.anime.findUnique({
      where: {
        id: id
      },
      include: {
        jpg: true,
        titles: true,
      }
    })
  }
}

