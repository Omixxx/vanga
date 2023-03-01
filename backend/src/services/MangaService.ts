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

  async searchById(id: number) {
    return await db.manga.findUnique({
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
