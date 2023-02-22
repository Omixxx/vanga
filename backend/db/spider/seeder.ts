import { Anime } from "jikan4.js";
import { db } from "../../config/db.server";
import { insertAnime } from "../services/inserAnimeIntoDb";
import { a, mineAnime, mineManga, resetAnimeMangaIndex } from "./spider";

async function seed() {
  let thereAreMoreAnimesToMine: boolean = true;
  let thereAreMoreMangasToMine: boolean = true;
  resetAnimeMangaIndex();


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

  // while (thereAreMoreMangasToMine) {
  //   let mangas: Manga[] = await mineManga();
  //   if (mangas.length === 0) {
  //     thereAreMoreMangasToMine = false;
  //     return;
  //   }
  //   mangas.forEach((manga) => {
  //     insertMangaIntoDb(manga);
  //   });
  // }
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
