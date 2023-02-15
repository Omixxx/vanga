import { Anime, Manga } from "jikan4.js";
import { mineAnime, mineManga, resetAnimeMangaIndex } from "./spider";

async function seed() {
  let thereAreMoreAnimesToMine: boolean = true;
  let thereAreMoreMangasToMine: boolean = true;
  resetAnimeMangaIndex();

  while (thereAreMoreAnimesToMine) {
    let animes: Anime[] = await mineAnime();
    if (animes.length === 0) {
      thereAreMoreAnimesToMine = false;
      return;
    }
    animes.forEach((anime) => {
      insertAnimeIntoDb(anime);
    });
  }

  while (thereAreMoreMangasToMine) {
    let mangas: Manga[] = await mineManga();
    if (mangas.length === 0) {
      thereAreMoreMangasToMine = false;
      return;
    }
    mangas.forEach((manga) => {
      insertMangaIntoDb(manga);
    });
  }
}

async function insertAnimeIntoDb(anime: Anime) {
  console.log("took ", anime.id);
}
async function insertMangaIntoDb(manga: Manga) {
  console.log("took ", manga.id);
}
seed();
