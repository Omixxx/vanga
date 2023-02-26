import exists from "../utils/exists";
import {
  isSearchRequest,
  SearchRequest,
  SearchResponse,
} from "../../../shared/types/types";
import assert from "assert";
import { Request, Response } from "express";
import { AnimeService } from "../services/AnimeService";
import { MangaService } from "../services/MangaService";
import convertJikanAnimeToCustomAnime from "../utils/convertJikanAnimeType";
import convertJikanMangaToCustomManga from "../utils/converJikanMangaType";
import printRequestHostName from "../utils/printRequestHostName";
import { Prisma } from "@prisma/client";
export type StrictAnimeSearch = Prisma.PromiseReturnType<typeof animeService.strictSearch>;
export type StrictMangaSearch = Prisma.PromiseReturnType<typeof mangaService.strictSearch>;

const animeService = new AnimeService();
const mangaService = new MangaService();
export async function search(req: Request, res: Response) {
  printRequestHostName(req, "is requesting search");
  assert(exists(req.body), "Request body is undefined");
  assert(
    isSearchRequest(req.body),
    "Request body is not of type SearchRequest"
  );
  const searchRequest: SearchRequest = req.body;

  const animeSearch: StrictAnimeSearch = await animeService.strictSearch(
    searchRequest.title
  );
  const mangaSearch: StrictMangaSearch = await mangaService.strictSearch(
    searchRequest.title
  );

  const response: SearchResponse = {
    animes: convertJikanAnimeToCustomAnime(animeSearch),
    mangas: convertJikanMangaToCustomManga(mangaSearch),
  };

  res.status(200).send(response);
}
