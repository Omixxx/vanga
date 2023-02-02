import { AnimeReview } from "jikan4.js";

export type TitleReviews = {
  title: string | null;
  reviews: AnimeReview[] | undefined;
};
