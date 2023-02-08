import * as tg from "generic-type-guard";

export const isAnime = new tg.IsInterface()
  .withProperties({
    titles: tg.isString,
    image: tg.isString,
    total_score: tg.isNumber,
    votes_reliability: tg.isNumber,
  })
  .get();

export const isManga = new tg.IsInterface()
  .withProperties({
    title: tg.isString,
    image: tg.isString,
    total_score: tg.isNumber,
    votes_reliability: tg.isNumber,
  })
  .get();

//todo: add attributes for type ( canon, ova, etc)
export const isSearchRequest = new tg.IsInterface()
  .withProperties({
    title: tg.isString,
  })
  .get();

export const isSearchResponse = new tg.IsInterface()
  .withProperties({
    animes: tg.isArray(tg.isExactObject(isAnime)),
    mangas: tg.isArray(tg.isExactObject(isManga)),
  })
  .get();

export type SearchResponse = tg.GuardedType<typeof isSearchResponse>;
export type SearchRequest = tg.GuardedType<typeof isSearchRequest>;
export type Manga = tg.GuardedType<typeof isManga>;
export type Anime = tg.GuardedType<typeof isAnime>;
