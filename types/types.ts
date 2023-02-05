import { AnimeReview } from "jikan4.js";

export type TitleReviews = {
  title: string | null;
  reviews: AnimeReview[] | undefined;
};

export type Result = {
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
