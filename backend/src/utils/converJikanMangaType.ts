import Jikan from "jikan4.js";
import { Manga, SourceType } from "../../../shared/types/types";

export default function convertJikanMangaToCustomManga(
  mangas: Jikan.Manga[]
): Manga[] {
  const convertedMangas: Manga[] = [];
  for (const manga of mangas) {
    convertedMangas.push({
      id: manga.id,
      sourceType: SourceType.manga,
      title: manga.titles[0].title,
      image: manga.image.webp.default?.toString() || "",
    });
  }
  return convertedMangas;
}
