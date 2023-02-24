import { Anime, AnimeStatistics, ContentStatisticsScore } from "jikan4.js";
import { db } from "../../config/db.server";
import hash from "object-hash";

type Relation = {
  relationType: string;
  source: string;
  relatedToId: number;
};

export async function insertAnime(anime: Anime | undefined) {
  if (anime === undefined) return console.log("not exist");

  if (
    (await db.anime.findFirst({ where: { id: anime.id } }))?.hash ===
    hash(anime)
  ) {
    return console.log("already exist");
  }
  let animeStatistics: AnimeStatistics = await anime.getStatistics();
  let contentStatisticsScore: any = animeStatistics.scores

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
      titles: {
        create: anime.titles.map((title) => {
          return {
            type: title.type,
            title: title.title
          }
        })
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
            genreType: genre.genreType,
          };
        }),
      },
      explicitGenres: {
        create: anime.explicitGenres.map((expliciteGenre) => {
          return {
            explicitGenreMalId: expliciteGenre.id,
            name: expliciteGenre.name,
            url: expliciteGenre.url.toString(),
            type: expliciteGenre.type,
            genreType: expliciteGenre.genreType,
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
            genreType: demographic.genreType,
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
            genreType: theme.genreType,
          };
        }),
      },
      relations: {
        create: await getRelations(anime),
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
      Statistics: {
        create: {
          watching: animeStatistics.watching,
          completed: animeStatistics.completed,
          onHold: animeStatistics.onHold,
          dropped: animeStatistics.dropped,
          planToWatch: animeStatistics.planToWatch,
          total: animeStatistics.total,
          scores: {
            create: contentStatisticsScore.map((score: ContentStatisticsScore) => {
              return {
                score: score.score,
                votes: score.votes,
                percentage: score.percentage
              }
            })
          }
        },

      },
      isExplicit: anime.isExplicit,
      hash: hash(anime),

    },
  });
  //
}

async function getRelations(anime: Anime): Promise<Relation[]> {
  const jikanRelations = await anime.getRelations();
  const relations: Relation[] = [];
  jikanRelations.map((relation) => {
    relation.items.map((item) => {
      relations.push({
        relationType: relation.relation,
        source: item.type.toLowerCase(),
        relatedToId: item.id,
      });
    });
  });
  return relations;
}
