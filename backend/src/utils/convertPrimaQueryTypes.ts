import { Anime, Source } from "../../../shared/types/types";
import { SearchAnimeById, StrictAnimeSearch } from "../controllers/Search";
import { Manga } from "../../../shared/types/types";
import { SearchMangaById, StrictMangaSearch } from "../controllers/Search";

export function convertPrismaStrictSearchToCustomAnime(
  animes: StrictAnimeSearch
): Anime[] {
  {
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
}

export function convertPrismaSearchByIdToCustomAnime(
  anime: SearchAnimeById
): Anime {
  if (!anime) throw new Error("Anime not found")
  return {
    id: anime.id,
    type: anime.type,
    synopsis: anime.synopsis || "",
    source: Source.anime,
    title: anime.titles[0].title,
    imageUrl: anime.jpg?.large?.toString() || "",
    isExplicit: anime.isExplicit,
    popularity: anime.popularity,
  };
}



export function convertPrismaStrictSearchToCustomManga(
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

export function convertPrismaSearchByIdToCustomManga(manga: SearchMangaById): Manga {
  if (!manga) throw new Error("manga is null ")
  return {
    id: manga.id,
    type: manga.type,
    synopsis: manga.synopsis || "",
    source: Source.manga,
    title: manga.titles[0].title,
    imageUrl: manga.jpg?.large?.toString() || "",
    isExplicit: manga.isExplicit,
    popularity: manga.popularity,
  }
}
