import { Request, Response } from "express";
import { isRelationRequest, Source } from "../../../shared/types/types";
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

  if (request.source === Source.anime) {
    console.log("anime");

    const relations = await animeService.getRelated(request.id);
    console.log(relations);
    relations?.forEach((relation) => {
      console.log(relation);
    });
  }

  if (request.source === Source.manga) {
    console.log("manga");

    const relations = await mangaService.getRelated(request.id);
    relations?.forEach((relation) => {
      console.log(relation);
    });
  }

  res.status(200).send("ok");
  console.log("done for ", request.id);
}
