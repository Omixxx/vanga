import { db } from "../../config/db.server";
import { insertAnime } from "../services/inserAnimeIntoDb";
import { insertManga } from "../services/insertMangaIntoDb";
import { a, mineAnime, mineManga, resetMiner } from "./spider";

async function seed() {
  let thereAreMoreAnimesToMine: boolean = true;
  let thereAreMoreMangasToMine: boolean = true;
  resetMiner();



  while (thereAreMoreMangasToMine) {
    const mangas = await mineManga()
    if (mangas.length === 0) {
      thereAreMoreMangasToMine = false;
      return;
    }
    for (const manga of mangas) {
      await insertManga(manga);
    }
  }
  while (thereAreMoreAnimesToMine) {
    const animes = await mineAnime()
    if (animes.length === 0) {
      thereAreMoreAnimesToMine = false;
      return;
    }

    for (const anime of animes) {
      await insertAnime(anime);
    }
  }

}

async function exampleQuery(title: string) {
  return await db.anime.findMany({
    where: {
      titles: {
        some: {
          title: {
            contains: title,
          },
        },
      },
    },
    include: {
      titles: true,
    },
  });

}
seed();

