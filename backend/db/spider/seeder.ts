import { Anime } from "jikan4.js";
import { db } from "../../config/db.server";
import { insertAnime } from "../services/inserAnimeIntoDb";
import { a, mineAnime, mineManga, resetAnimeMangaIndex } from "./spider";

async function seed() {
  let thereAreMoreAnimesToMine: boolean = true;
  let thereAreMoreMangasToMine: boolean = true;
  resetAnimeMangaIndex();

  const anime: Anime | undefined = await a();
  insertAnime(anime);
  const result = await db.anime.findMany({
    where: {
      title: {
        some: {
          title: {
            contains: "cowboy",
          },
        },
      },
    },
    include: {
      title: true,
    },
  });

  console.log(result);

  // while (thereAreMoreAnimesToMine) {
  //   let animes: Anime[] = await mineAnime();
  //   if (animes.length === 0) {
  //     thereAreMoreAnimesToMine = false;
  //     return;
  //   }
  //   animes.forEach((anime) => {
  //     insertAnimeIntoDb(anime);
  //   });
  // }
  //
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

seed();
