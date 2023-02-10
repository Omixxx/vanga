import Jikan from "jikan4.js";
import { Anime, Source } from "../../../shared/types/types";

export default function convertJikanAnimeToCustomAnime(
  animes: Jikan.Anime[]
): Anime[] {
  const convertedAnimes: Anime[] = [];
  for (const anime of animes) {
    convertedAnimes.push({
      id: anime.id,
      type: anime.type,
      synopsis: anime.synopsis || "",
      source: Source.anime,
      title: anime.titles[0].title,
      imageUrl: anime.image.jpg.large?.toString() || "",
      isExplicit: anime.isExplicit,
    });
  }
  return convertedAnimes;
}
