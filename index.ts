import Jikan, {
  Anime,
  AnimeRelationGroup,
  ContentRelationType,
} from "jikan4.js";
import chalk from "chalk";
import { TitleReviews } from "./types/types";
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
  const animes: Anime[] = await search("made in abyss");
  animes.forEach(async (anime: Anime) => {
    console.log(anime.title.english);
  });
}

async function printRelations(animes: Anime[]) {
  animes.forEach(async (anime: Anime) => {
    const relations = await anime.getRelations();
    console.log(
      `${chalk.red("Title")}: ${anime.title.english}\n${chalk.red(
        "Relations"
      )}: ${relations.map(
        (relation: AnimeRelationGroup<ContentRelationType>) => {
          console.log(relation);
        }
      )}`
    );
  });
}

async function search(title: string) {
  const animes: Anime[] = await client.anime.search(title);
  return animes.filter((anime: Anime) => {
    return (
      anime.title.english !== null &&
      anime.title.english.toLowerCase().includes(title.toLowerCase())
    );
  });
}

main();
