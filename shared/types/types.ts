import * as tg from "generic-type-guard";

export enum Source {
  anime = "anime",
  manga = "manga",
}

export const isRelationRequest = new tg.IsInterface()
  .withProperties({
    id: tg.isNumber,
    source: tg.isUnion(
      tg.isSingletonString(Source.manga),
      tg.isSingletonString(Source.anime)
    ),
  })
  .get();

export const isAnime = new tg.IsInterface()
  .withProperties({
    id: tg.isNumber,
    type: tg.isString,
    source: tg.isSingletonString(Source.anime),
    title: tg.isString,
    imageUrl: tg.isString,
    synopsis: tg.isString,
  })
  .get();

export const isManga = new tg.IsInterface()
  .withProperties({
    id: tg.isNumber,
    type: tg.isString,
    source: tg.isSingletonString(Source.manga),
    title: tg.isString,
    imageUrl: tg.isString,
    synopsis: tg.isString,
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

export type RelationRequest = tg.GuardedType<typeof isRelationRequest>;
export type SearchResponse = tg.GuardedType<typeof isSearchResponse>;
export type SearchRequest = tg.GuardedType<typeof isSearchRequest>;
export type Manga = tg.GuardedType<typeof isManga>;
export type Anime = tg.GuardedType<typeof isAnime>;
