import Jikan, { Anime, Manga } from "jikan4.js";

const jikan = new Jikan.Client();

let currentAnimeIndex: number = 0;
let numberOfAnimeMangaWeRequest: number = 1;
let currentMangaIndex: number = 0;

export async function mineAnime(): Promise<Anime[]> {
  console.log("Mining anime number ", currentAnimeIndex);
  return jikan.anime.list(currentAnimeIndex++, numberOfAnimeMangaWeRequest);
}

export async function mineManga(): Promise<Manga[]> {
  console.log(" Mining manga number ", currentMangaIndex);
  return jikan.manga.list(currentMangaIndex++, numberOfAnimeMangaWeRequest);
}

export function a() {
  return jikan.anime.getFull(1);
}

export function resetAnimeMangaIndex(): void {
  currentAnimeIndex = 0;
  currentMangaIndex = 0;
}
