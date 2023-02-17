import { Anime, Manga } from "jikan4.js";
import { db } from "../../config/db.server";
import { a, mineAnime, mineManga, resetAnimeMangaIndex } from "./spider";

async function seed() {
  let thereAreMoreAnimesToMine: boolean = true;
  let thereAreMoreMangasToMine: boolean = true;
  resetAnimeMangaIndex();

  a().then(async (anime: Anime | undefined) => {
    if (anime === undefined) return console.log("not exist");

    const jikanRelations = await anime.getRelations();

    const relations: {
      relationType: string;
      sourceType: string;
      relatedToId: number;
    }[] = [];

    jikanRelations.map((relation) => {
      relation.items.map((item) => {
        relations.push({
          relationType: relation.relation,
          sourceType: item.type.toLowerCase(),
          relatedToId: item.id,
        });
      });
    });

    await db.anime.create({
      data: {
        id: anime.id,
        url: anime.url.toString(),
        jpg: {
          create: {
            small: anime.image.jpg.small?.toString() || "",
            medium: anime.image.jpg.medium?.toString() || "",
            large: anime.image.jpg.large?.toString() || "",
            maximum: anime.image.jpg.maximum?.toString() || "",
            default: anime.image.jpg.default?.toString() || "",
          },
        },
        webp: {
          create: {
            small: anime.image.webp.small?.toString() || "",
            medium: anime.image.webp.medium?.toString() || "",
            large: anime.image.webp.large?.toString() || "",
            maximum: anime.image.webp.maximum?.toString() || "",
            default: anime.image.webp.default?.toString() || "",
          },
        },
        title: {
          createMany: {
            data: anime.titles,
          },
        },
        score: anime.score,
        scoredBy: anime.scoredBy,
        rank: anime.rank,
        popularity: anime.popularity,
        members: anime.members,
        favorites: anime.favorites,
        synopsis: anime.synopsis,
        background: anime.background,
        approved: anime.approved,
        trailer: {
          create: {
            url: anime.trailer?.url.toString() || "",
            embedUrl: anime.trailer?.embedUrl?.toString() || "",
            trailerImageMalId: anime.trailer?.id || "",
            TrailerImage: {
              create: {
                small: anime.trailer?.image.small?.toString() || "",
                medium: anime.trailer?.image.medium?.toString() || "",
                large: anime.trailer?.image.large?.toString() || "",
                maximum: anime.trailer?.image.maximum?.toString() || "",
                default: anime.trailer?.image.default?.toString() || "",
              },
            },
          },
        },
        type: anime.type,
        source: anime.source,
        episodes: anime.episodes,
        airInfo: {
          create: {
            status: anime.airInfo.status,
            airing: anime.airInfo.airing,
            airedForm: anime.airInfo.airedFrom,
          },
        },
        duration: anime.duration,
        rating: anime.rating,
        season: anime.season,
        year: anime.year,
        producers: {
          create: anime.producers.map((producer) => {
            return {
              producerMalId: producer.id,
              name: producer.name,
              url: producer.url.toString(),
              type: producer.type,
            };
          }),
        },
        lincensors: {
          create: anime.licensors.map((lincensor) => {
            return {
              lincensorMalId: lincensor.id,
              name: lincensor.name,
              url: lincensor.url.toString(),
              type: lincensor.type,
            };
          }),
        },
        studios: {
          create: anime.studios.map((studio) => {
            return {
              studioMalId: studio.id,
              name: studio.name,
              url: studio.url.toString(),
              type: studio.type,
            };
          }),
        },
        genres: {
          create: anime.genres.map((genre) => {
            return {
              genreMalId: genre.id,
              name: genre.name,
              url: genre.url.toString(),
              type: genre.type,
              genereType: genre.genreType,
            };
          }),
        },
        explicitGeneres: {
          create: anime.explicitGenres.map((expliciteGenre) => {
            return {
              explicitGenreMalId: expliciteGenre.id,
              name: expliciteGenre.name,
              url: expliciteGenre.url.toString(),
              type: expliciteGenre.type,
              genereType: expliciteGenre.genreType,
            };
          }),
        },
        demographic: {
          create: anime.demographics.map((demographic) => {
            return {
              demographicMalId: demographic.id,
              name: demographic.name,
              url: demographic.url.toString(),
              type: demographic.type,
              genereType: demographic.genreType,
            };
          }),
        },
        themes: {
          create: anime.themes.map((theme) => {
            return {
              themeMalId: theme.id,
              name: theme.name,
              url: theme.url.toString(),
              type: theme.type,
              genereType: theme.genreType,
            };
          }),
        },
        relations: {
          create: relations,
        },
        openings: {
          create: (
            await anime.getThemes()
          ).openings.map((opening) => {
            return {
              title: opening,
            };
          }),
        },
        endings: {
          create: (
            await anime.getThemes()
          ).endings.map((ending) => {
            return {
              title: ending,
            };
          }),
        },
        streamingLink: {
          create: (
            await anime.getStreamingLinks()
          ).map((streamingLink) => {
            return {
              name: streamingLink.name,
              url: streamingLink.url.toString(),
            };
          }),
        },
        isExplicit: anime.isExplicit,
      },
    });
    //
  });

  // while (thereAreMoreAnimesToMine) {
  //   let animes: Anime[] = await mineAnime();
  //   if (animes.length === 0) {
  //     thereAreMoreAnimesToMine = false;
  //     return;
  //   }
  //   animes.forEach((anime) => {
  //     insertAnimeIntoDb(anime);
  //   });
  // }
  //
  // while (thereAreMoreMangasToMine) {
  //   let mangas: Manga[] = await mineManga();
  //   if (mangas.length === 0) {
  //     thereAreMoreMangasToMine = false;
  //     return;
  //   }
  //   mangas.forEach((manga) => {
  //     insertMangaIntoDb(manga);
  //   });
  // }
}

async function insertAnimeIntoDb(anime: Anime) {
  console.log("took ", anime.id);
}
async function insertMangaIntoDb(manga: Manga) {
  console.log("took ", manga.id);
}
seed();
