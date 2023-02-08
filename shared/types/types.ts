import * as tg from "generic-type-guard";

export const isAnime = new tg.IsInterface()
  .withProperties({
    title: tg.isNullable(tg.isString),
    image: tg.isNullable(tg.isString),
  })
  .get();

export const isManga = new tg.IsInterface()
  .withProperties({
    title: tg.isNullable(tg.isString),
    image: tg.isNullable(tg.isString),
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
