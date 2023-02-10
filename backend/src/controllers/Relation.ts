import { Request, Response } from "express";
import { isRelationRequest, SourceType } from "../../../shared/types/types";
import { AnimeService } from "../services/AnimeService";
import { MangaService } from "../services/MangaService";
import exists from "../utils/exists";
import printRequestHostName from "../utils/printRequestHostName";

const animeService = new AnimeService();
const mangaService = new MangaService();

export default async function getRelations(req: Request, res: Response) {
  if (!exists(req.body)) throw new Error("Request body is empty");
  if (!isRelationRequest(req.body)) throw new Error("Invalid request body");
  printRequestHostName(req, `is requesting relations for ${req.body.id}`);
  const request = req.body;

  if (request.sourceType === SourceType.anime) {
    console.log("anime");

    const relations = await animeService.getRelations(request.id);
    relations?.forEach((relation) => {
      console.log(relation);
    });
  }

  if (request.sourceType === SourceType.manga) {
    console.log("manga");

    const relations = await mangaService.getRelations(request.id);
    relations?.forEach((relation) => {
      console.log(relation);
    });
  }

  res.status(200).send("ok");
  console.log("done for ", request.id);
}
