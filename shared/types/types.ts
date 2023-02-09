import * as tg from "generic-type-guard";

export const isAnime = new tg.IsInterface()
  .withProperties({
    id: tg.isNumber,
    title: tg.isString,
    image: tg.isString,
  })
  .get();

export const isManga = new tg.IsInterface()
  .withProperties({
    id: tg.isNumber,
    title: tg.isString,
    image: tg.isString,
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
    animes: tg.isArray(isAnime),
    mangas: tg.isArray(isManga),
  })
  .get();

export type SearchResponse = tg.GuardedType<typeof isSearchResponse>;
export type SearchRequest = tg.GuardedType<typeof isSearchRequest>;
export type Manga = tg.GuardedType<typeof isManga>;
export type Anime = tg.GuardedType<typeof isAnime>;
