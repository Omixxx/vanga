import { TitleReviews } from "../../../types/types";
import Jikan, { Anime } from "jikan4.js";

class AnimeService {
  client: Jikan.Client;
  constructor() {
    this.client = new Jikan.Client();
  }

  async getReviews(animes: Anime[]): Promise<TitleReviews[]> {
    let result: TitleReviews[] = [];
    for (let anime of animes) {
      const reviews = await this.client.anime.getReviews(anime.id);
      const titleReviews: TitleReviews = {
        title: anime.title.english,
        reviews: reviews,
      };
      result.push(titleReviews);
    }
    return result;
  }

  async getType(anime: Anime) {
    console.log(anime.type + " - " + anime.titles[0].title);
  }

  async strictSearch(title: string) {
    const animes: Anime[] = await this.client.anime.search(title);
    return animes.filter((anime: Anime) => {
      for (let entry of anime.titles) {
        if (entry.title.toLowerCase().includes(title.toLowerCase()))
          return true;
      }
    });
  }
}
