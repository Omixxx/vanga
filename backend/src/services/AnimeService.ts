import Jikan, { Anime } from "jikan4.js";
export class AnimeService {
  client: Jikan.Client;
  constructor() {
    this.client = new Jikan.Client();
  }

  async strictSearch(title: string): Promise<Anime[]> {
    const animes: Anime[] = await this.client.anime.search(title);
    return animes.filter((anime: Anime) => {
      for (let entry of anime.titles) {
        if (entry.title.toLowerCase().includes(title.toLowerCase()))
          return true;
      }
    });
  }
}
