import exists from "../utils/exists";
import {
  Content,
  isSearchByIdRequest,
  isSearchByTitleRequest,
  SearchByIdRequest,
  SearchByIdResponse,
  SearchByTitleRequest as SearchByTitleRequest,
} from "../../../shared/types/types";
import assert from "assert";
import { Request, Response } from "express";
import { AnimeService } from "../services/AnimeService";
import { MangaService } from "../services/MangaService";
import printRequestHostName from "../utils/printRequestHostName";
import { Prisma } from "@prisma/client";
import { convertPrismaSearchByIdToCustomAnime, convertPrismaSearchByIdToCustomManga, convertPrismaStrictSearchToCustomAnime, convertPrismaStrictSearchToCustomManga } from "../utils/convertPrimaQueryTypes";
import { RelatedService } from "../services/RelatedSearvice";
export type StrictAnimeSearch = Prisma.PromiseReturnType<typeof animeService.strictSearch>;
export type StrictMangaSearch = Prisma.PromiseReturnType<typeof mangaService.strictSearch>;
export type SearchAnimeById = Prisma.PromiseReturnType<typeof animeService.searchById>;
export type SearchMangaById = Prisma.PromiseReturnType<typeof mangaService.searchById>;
export type Related = Prisma.PromiseReturnType<typeof relatedService.getRelated>;

const animeService = new AnimeService();
const mangaService = new MangaService();
const relatedService = new RelatedService();
export async function searchByTitle(req: Request, res: Response) {
  printRequestHostName(req, "is requesting search");
  assert(exists(req.body), "Request body is undefined");
  assert(
    isSearchByTitleRequest(req.body),
    "Request body is not of type SearchRequest"
  );
  const searchRequest: SearchByTitleRequest = req.body;

  const animeSearch: StrictAnimeSearch = await animeService.strictSearch(
    searchRequest.title
  );
  const mangaSearch: StrictMangaSearch = await mangaService.strictSearch(
    searchRequest.title
  );

  const response: Content = {
    animes: convertPrismaStrictSearchToCustomAnime(animeSearch),
    mangas: convertPrismaStrictSearchToCustomManga(mangaSearch),
  };

  res.status(200).send(response);
}


export async function searchById(req: Request, res: Response) {
  printRequestHostName(req, "is requesting search by id");
  assert(exists(req.body), "Request body is undefined");
  assert(
    isSearchByIdRequest(req.body),
    "Request body is not of type SearchByIdRequest"
  );
  const searchRequest: SearchByIdRequest = req.body;
  let response: SearchByIdResponse = { content: null }

  if (searchRequest.source === "anime") {
    let query: SearchAnimeById = await animeService.searchById(searchRequest.id);
    response.content = convertPrismaSearchByIdToCustomAnime(query);
  }

  if (searchRequest.source === "manga") {
    let query: SearchMangaById = await mangaService.searchById(searchRequest.id);
    response.content = convertPrismaSearchByIdToCustomManga(query);
  }

  res.status(200).send(response);
}

export async function searchRelatedById(req: Request, res: Response) {
  printRequestHostName(req, "is requesting search by id");
  assert(exists(req.body), "Request body is undefined");

  const searchRequest: SearchByIdRequest = req.body;
  let response: Content = { animes: [], mangas: [] };

  const related: Related = await relatedService.getRelated(searchRequest.id);
  console.log(related);

  for (const entity of related) {
    if (entity.source === "anime") {
      const content = await animeService.searchById(entity.relatedToId);
      if (content)
        response.animes.push(convertPrismaSearchByIdToCustomAnime(content));
      continue;
    }
    const content = await mangaService.searchById(entity.relatedToId);
    if (content)
      response.mangas.push(convertPrismaSearchByIdToCustomManga(content));
  }
  res.status(200).send(response);
}
