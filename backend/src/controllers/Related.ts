import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { isRelationRequest, RelationResponse, Source } from "../../../shared/types/types";
import { AnimeService } from "../services/AnimeService";
import { MangaService } from "../services/MangaService";
import exists from "../utils/exists";
import printRequestHostName from "../utils/printRequestHostName";
export type PrismaAnimeRelations = Prisma.PromiseReturnType<typeof animeService.getRelated>;
export type PrismaMangaRelations = Prisma.PromiseReturnType<typeof mangaService.getRelated>;

const animeService = new AnimeService();
const mangaService = new MangaService();

export default async function getRelated(req: Request, res: Response) {
  if (!exists(req.body)) throw new Error("Request body is empty");
  if (!isRelationRequest(req.body)) throw new Error("Invalid request body");
  printRequestHostName(req, `is requesting relations for ${req.body.id}`);
  const request = req.body;
  let response: RelationResponse = {
    relations: []
  };

  if (request.source === Source.anime) {
    console.log("anime");

    const relations: PrismaAnimeRelations = await animeService.getRelated(request.id);
    for (const relation of relations) {
      console.log(relation)
      response.relations.push({
        fromContentId: relation.animeId,
        source: Source.anime,
        relationType: relation.relationType,
        toContentId: relation.relatedToId,
      })
    }
  }

  if (request.source === Source.manga) {
    console.log("manga");
    const relations: PrismaMangaRelations = await mangaService.getRelated(request.id);
    for (const relation of relations) {
      console.log(relation)
      response.relations.push({
        fromContentId: relation.mangaId,
        source: Source.manga,
        relationType: relation.relationType,
        toContentId: relation.relatedToId,
      })
    }
  }

  res.status(200).send(response);
  console.log("done for ", request.id);
}
