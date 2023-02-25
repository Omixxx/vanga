import { Manga } from "@prisma/client";
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

  async getRelated(id: number): Promise<Manga[]> {
    return await db.manga.findMany({
      where: {
        relations: {
          some: {
            relatedToId: id,
          }
        }
      },
      include: {
        titles: true,
        jpg: true,
        relations: true,
      }
    })
  }
}
