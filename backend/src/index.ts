import Jikan, { Anime } from "jikan4.js";
import chalk from "chalk";
import { TitleReviews } from "../../types/types";
const client = new Jikan.Client();

async function getReviews(animes: Anime[]): Promise<TitleReviews[]> {
  let result: TitleReviews[] = [];

  for (const anime of animes) {
    const reviews = await client.anime.getReviews(anime.id);
    const titleReviews: TitleReviews = {
      title: anime.title.english,
      reviews: reviews,
    };
    result.push(titleReviews);
  }
  return result;
}

function printAnimeStats(animes: Anime[]) {
  animes.sort((a, b) => {
    if (a.score === null) return 1;
    if (b.score === null) return -1;
    return b.score - a.score;
  });
  animes.forEach((anime) => {
    console.log(`${anime.title}: ${chalk.red(anime.score)}`);
  });
}

async function main() {
  const animes: Anime[] = await strictAnimeSearch("nanatsu no taizai");
  animes.forEach(async (anime: Anime) => {
    const statistics = await anime.getStatistics();
    const animeRelations = await anime.getRelations();
    getAnimeType(anime);
    console.log(anime);
  });
}

async function getAnimeType(anime: Anime) {
  console.log(anime.type + " - " + anime.titles[0].title);
}

async function strictAnimeSearch(title: string) {
  const animes: Anime[] = await client.anime.search(title);
  return animes.filter((anime: Anime) => {
    for (let entry of anime.titles) {
      if (entry.title.toLowerCase().includes(title.toLowerCase())) return true;
    }
  });
}

main();
