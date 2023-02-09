import Jikan from "jikan4.js";
import { Anime } from "../../../shared/types/types";

export default function convertJikanAnimeToCustomAnime(
  animes: Jikan.Anime[]
): Anime[] {
  const convertedAnimes: Anime[] = [];
  for (const anime of animes) {
    convertedAnimes.push({
      id: anime.id,
      title: anime.titles[0].title,
      image: anime.image.webp.default?.toString() || "",
    });
  }
  return convertedAnimes;
}
