import { AnimeReview } from "jikan4.js";
import * as tg from "generic-type-guard";

export type TitleReviews = {
  title: string | null;
  reviews: AnimeReview[] | undefined;
};

export type SearchResponse = {
  animes: Anime[];
  manga: Manga;
  winner_title: string;
};

export type Anime = {
  titles: string;
  image: string;
  total_score: number;
  votes_reliability: number;
};

export type Manga = {
  title: string;
  image: string;
  total_score: number;
  votes_reliability: number;
};

//todo: add attributes for type ( canon, ova, etc)
export const isSearchRequest = new tg.IsInterface()
  .withProperties({
    title: tg.isString,
  })
  .get();

export type SearchRequest = tg.GuardedType<typeof isSearchRequest>;
