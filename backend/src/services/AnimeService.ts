import Jikan, { Anime } from "jikan4.js";
import exists from "../utils/exists";
export class AnimeService extends Jikan.Client {
  constructor() {
    super();
  }

  async strictSearch(title: string): Promise<Anime[]> {
    const animes: Anime[] = await this.anime.search(title);
    return animes.filter((anime: Anime) => {
      for (let entry of anime.titles) {
        if (entry.title.toLowerCase().includes(title.toLowerCase()))
          return true;
      }
    });
  }

  async getRelations(
    animeId: number
  ): Promise<
    Jikan.AnimeRelationGroup<Jikan.ContentRelationType>[] | undefined
  > {
    if (!exists(animeId)) throw new Error("Anime is undefined");
    return await this.anime.getRelations(animeId);
  }
}
