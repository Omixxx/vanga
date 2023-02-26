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

export const isRelationType = new tg.IsInterface().withProperty("type",
  tg.isSingletonString("Adaptation") ||
  tg.isSingletonString("Sequel") ||
  tg.isSingletonString("SideStory") ||
  tg.isSingletonString("Prequel") ||
  tg.isSingletonString("Character") ||
  tg.isSingletonString("AlternativeVersion") ||
  tg.isSingletonString("AlternativeSetting") ||
  tg.isSingletonString("SpinOff") ||
  tg.isSingletonString("ParentStory") ||
  tg.isSingletonString("FullStory") ||
  tg.isSingletonString("Unknown") ||
  tg.isSingletonString("Other") ||
  tg.isSingletonString("Summary")).get()

export const isRelation = new tg.IsInterface().withProperties({
  fromContentId: tg.isNullable(tg.isNumber),
  source: tg.isUnion(
    tg.isSingletonString(Source.manga),
    tg.isSingletonString(Source.anime)
  ),
  relationType: tg.isString,
  toContentId: tg.isNumber,
}).get()

export const isRelationResponse = new tg.IsInterface().withProperties({
  relations: tg.isArray(isRelation),
}).get()

export const isAnime = new tg.IsInterface()
  .withProperties({
    id: tg.isNumber,
    type: tg.isString,
    source: tg.isSingletonString(Source.anime),
    title: tg.isString,
    imageUrl: tg.isString,
    synopsis: tg.isString,
    isExplicit: tg.isBoolean,
    popularity: tg.isNullable(tg.isNumber),
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
    isExplicit: tg.isBoolean,
    popularity: tg.isNullable(tg.isNumber),
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

export type Relation = tg.GuardedType<typeof isRelation>;
export type RelationResponse = tg.GuardedType<typeof isRelationResponse>;
export type RelationRequest = tg.GuardedType<typeof isRelationRequest>;
export type SearchResponse = tg.GuardedType<typeof isSearchResponse>;
export type SearchRequest = tg.GuardedType<typeof isSearchRequest>;
export type Manga = tg.GuardedType<typeof isManga>;
export type RelationType = tg.GuardedType<typeof isRelationType>;
export type Anime = tg.GuardedType<typeof isAnime>;
