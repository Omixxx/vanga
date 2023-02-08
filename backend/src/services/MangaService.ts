import Jikan from "jikan4.js";
import exists from "../utils/exists";

export class MangaService {
  client: Jikan.Client;
  constructor() {
    this.client = new Jikan.Client();
  }

  async strictSearch(title: string): Promise<Jikan.Manga[]> {
    const mangas: Jikan.Manga[] = await this.client.manga.search(title);
    return mangas.filter((manga: Jikan.Manga) => {
      for (let entry of manga.titles) {
        if (entry.title.toLowerCase().includes(title.toLowerCase()))
          return true;
      }
    });
  }

  async wideSearch(title: string): Promise<Jikan.Manga[]> {
    return await this.client.manga.search(title);
  }

  async getRelations(
    manga: Jikan.Manga
  ): Promise<
    Jikan.MangaRelationGroup<Jikan.ContentRelationType>[] | undefined
  > {
    if (!exists(manga)) throw new Error("Manga is undefined");

    return this.client.manga.getRelations(manga.id);
  }
}
