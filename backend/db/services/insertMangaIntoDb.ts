import { ContentStatisticsScore, Manga, MangaStatistics } from "jikan4.js";
import { db } from "../../config/db.server";
import hash from "object-hash";

type Relation = {
  relationType: string;
  source: string;
  relatedToId: number;
};

export async function insertManga(manga: Manga | undefined) {
  if (manga === undefined) return console.log("not exist");
  const mangaDbHash = (await db.manga.findFirst({ where: { id: manga.id } }))?.hash

  if (mangaDbHash === hash(manga))
    return console.log("already exist");

  if (mangaDbHash !== hash(manga) && mangaDbHash !== undefined)
    await db.manga.delete({ where: { id: manga.id } });

  let mangaStatistics: MangaStatistics = await manga.getStatistics();
  let contentStatisticsScore: any = mangaStatistics.scores


  await db.manga.create({
    data: {
      id: manga.id,
      url: manga.url.toString(),
      jpg: {
        create: {
          small: manga.image.jpg.small?.toString() || "",
          medium: manga.image.jpg.medium?.toString() || "",
          large: manga.image.jpg.large?.toString() || "",
          maximum: manga.image.jpg.maximum?.toString() || "",
          default: manga.image.jpg.default?.toString() || "",
        },
      },
      titles: {
        create: manga.titles.map((title) => {
          return {
            type: title.type,
            title: title.title
          }
        })
      },
      score: manga.score,
      scoredBy: manga.scoredBy,
      rank: manga.rank,
      popularity: manga.popularity,
      members: manga.members,
      favorites: manga.favorites,
      synopsis: manga.synopsis,
      background: manga.background,
      approved: manga.approved,
      type: manga.type,
      volumes: manga.volumes,
      chapters: manga.chapters,
      publishInfo: {
        create: {
          publishing: manga.publishInfo.publishing,
          publishedFrom: manga.publishInfo.publishedFrom,
          publishedTo: manga.publishInfo.publishedTo,
          status: manga.publishInfo.status,
        },
      },
      serializations: {
        create: manga.serializations.map((serialization) => {
          return {
            authorMalId: serialization.id,
            name: serialization.name,
            url: serialization.url.toString(),
            type: serialization.type,
          }
        })
      },
      genres: {
        create: manga.genres.map((genre) => {
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
        create: manga.explicitGenres.map((expliciteGenre) => {
          return {
            explicitGenreMalId: expliciteGenre.id,
            name: expliciteGenre.name,
            url: expliciteGenre.url.toString(),
            type: expliciteGenre.type,
            genreType: expliciteGenre.genreType,
          };
        }),
      },
      demographics: {
        create: manga.demographics.map((demographic) => {
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
        create: manga.themes.map((theme) => {
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
        create: await getRelations(manga)
      },
      statistics: {
        create: {
          consuming: mangaStatistics.reading,
          completed: mangaStatistics.completed,
          onHold: mangaStatistics.onHold,
          dropped: mangaStatistics.dropped,
          total: mangaStatistics.total,
          planToConsume: mangaStatistics.planToRead,
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
      isExplicit: manga.isExplicit,
      hash: hash(manga),
    },
  });
  //
}

async function getRelations(manga: Manga): Promise<Relation[]> {
  const jikanRelations = await manga.getRelations();
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
