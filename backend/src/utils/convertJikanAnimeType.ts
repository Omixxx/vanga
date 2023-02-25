import { Anime, Source } from "../../../shared/types/types";
import { StrictAnimeSearch } from "../controllers/Search";
export default function convertJikanAnimeToCustomAnime(
  animes: StrictAnimeSearch
): Anime[] {
  const convertedAnimes: Anime[] = [];
  for (const anime of animes) {
    convertedAnimes.push({
      id: anime.id,
      type: anime.type,
      synopsis: anime.synopsis || "",
      source: Source.anime,
      title: anime.titles[0].title,
      imageUrl: anime.jpg?.large?.toString() || "",
      isExplicit: anime.isExplicit,
      popularity: anime.popularity,
    });
  }
  return convertedAnimes;
}
