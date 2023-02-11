import { Container, Grid } from "@mantine/core";
import { useLocation } from "react-router-dom";
import {
  Anime,
  Manga,
  SearchResponse,
} from "../../../../../shared/types/types";
import getRelations from "../../services/relations/getRelations";
import { AnimeMangaCard } from "./components/AnimeMangaCard";

export default function viewTest() {
  const SearchResponse = useLocation().state as SearchResponse;

  return (
    <Container>
      {renderAnimeOrManga(SearchResponse.animes)}
      {renderAnimeOrManga(SearchResponse.mangas)}
    </Container>
  );

  function renderAnimeOrManga(entity: Anime[] | Manga[]) {
    return entity.map((e) => {
      if (e.isExplicit) return;
      return (
        <Grid key={e.id}>
          <Grid.Col>
            <AnimeMangaCard
              title={e.title}
              source={e.source}
              id={e.id}
              image={e.imageUrl}
              description={e.synopsis}
              rating={e.source}
              onClick={() => {
                getRelations(e.id, e.source);
              }}
            ></AnimeMangaCard>
          </Grid.Col>
        </Grid>
      );
    });
  }
}
