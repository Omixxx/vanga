import exists from "../utils/exists";
import {
  isSearchRequest,
  SearchRequest,
  isSearchResponse,
  SearchResponse,
} from "../../../shared/types/types";
import assert from "assert";
import { Request, Response } from "express";
import chalk from "chalk";
import { AnimeService } from "../services/AnimeService";
import { MangaService } from "../services/MangaService";
import Jikan from "jikan4.js";
import convertJikanAnimeType from "../utils/convertJikanAnimeType";
import convertJikanMangaType from "../utils/converJikanMangaType";

const animeServie = new AnimeService();
const mangaService = new MangaService();
export async function search(req: Request, res: Response) {
  console.log(chalk.yellow(req.hostname) + " requested a search");

  assert(exists(req.body), "Request body is undefined");
  assert(
    isSearchRequest(req.body),
    "Request body is not of type SearchRequest"
  );
  const searchRequest: SearchRequest = req.body;

  const animeSearch: Jikan.Anime[] = await animeServie.strictSearch(
    searchRequest.title
  );
  const mangaSearch: Jikan.Manga[] = await mangaService.strictSearch(
    searchRequest.title
  );

  const response: SearchResponse = {
    animes: convertJikanAnimeType(animeSearch),
    mangas: convertJikanMangaType(mangaSearch),
  };

  res.status(200).send(response);
}
