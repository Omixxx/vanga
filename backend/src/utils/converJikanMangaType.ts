import Jikan from "jikan4.js";
import { Manga } from "../../../shared/types/types";

export default function convertJikanMangaType(mangas: Jikan.Manga[]): Manga[] {
  const convertedMangas: Manga[] = [];
  for (const manga of mangas) {
    convertedMangas.push({
      title: manga.titles[0].title,
      image: manga.image.webp.default?.toString() || "",
    });
  }
  return convertedMangas;
}
