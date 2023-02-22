import Jikan from "jikan4.js";
import exists from "../utils/exists";

export class MangaService extends Jikan.Client {
  constructor() {
    super();
  }

  async strictSearch(title: string): Promise<Jikan.Manga[]> {
    const mangas: Jikan.Manga[] = await this.manga.search(title);
    return mangas.filter((manga: Jikan.Manga) => {
      for (let entry of manga.titles) {
        if (entry.title.toLowerCase().includes(title.toLowerCase()))
          return true;
      }
    });
  }

  async wideSearch(title: string): Promise<Jikan.Manga[]> {
    return await this.manga.search(title);
  }

  async getRelations(
    mangaId: number
  ): Promise<
    Jikan.MangaRelationGroup<Jikan.ContentRelationType>[] | undefined
  > {
    if (!exists(mangaId)) throw new Error("Manga is undefined");
    return this.manga.getRelations(mangaId);
  }
}
