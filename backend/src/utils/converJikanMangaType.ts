import Jikan from "jikan4.js";
import { Manga, Source } from "../../../shared/types/types";

export default function convertJikanMangaToCustomManga(
  mangas: Jikan.Manga[]
): Manga[] {
  const convertedMangas: Manga[] = [];
  for (const manga of mangas) {
    convertedMangas.push({
      id: manga.id,
      type: manga.type,
      synopsis: manga.synopsis || "",
      source: Source.manga,
      title: manga.titles[0].title,
      imageUrl: manga.image.jpg.large?.toString() || "",
      isExplicit: manga.isExplicit,
    });
  }
  return convertedMangas;
}
