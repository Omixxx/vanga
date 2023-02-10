import { Request, Response } from "express";
import { isRelationRequest, SourceType } from "../../../shared/types/types";
import { AnimeService } from "../services/AnimeService";
import { MangaService } from "../services/MangaService";
import exists from "../utils/exists";

const animeService = new AnimeService();
const mangaService = new MangaService();

export default async function getRelations(req: Request, res: Response) {
  if (!exists(req.body)) throw new Error("Request body is empty");
  if (!isRelationRequest(req.body)) throw new Error("Invalid request body");
  const request = req.body;

  if (request.sourceType === SourceType.anime) {
    const relations = await animeService.getRelations(request.id);
    console.log(relations);
  }

  if (request.sourceType === SourceType.manga) {
    const relations = await mangaService.getRelations(request.id);
    console.log(relations);
  }

  res.status(200).send("ok");
}
