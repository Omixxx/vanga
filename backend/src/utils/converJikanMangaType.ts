import Jikan from "jikan4.js";
import { Manga, Source } from "../../../shared/types/types";
import { StrictMangaSearch } from "../controllers/Search";

export default function convertJikanMangaToCustomManga(
  mangas: StrictMangaSearch
): Manga[] {
  const convertedMangas: Manga[] = [];
  for (const manga of mangas) {
    convertedMangas.push({
      id: manga.id,
      type: manga.type,
      synopsis: manga.synopsis || "",
      source: Source.manga,
      title: manga.titles[0].title,
      imageUrl: manga.jpg?.large?.toString() || "",
      isExplicit: manga.isExplicit,
      popularity: manga.popularity,
    });
  }
  return convertedMangas;
}
