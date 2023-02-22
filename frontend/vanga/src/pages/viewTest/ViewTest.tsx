import { Container, Grid } from "@mantine/core";
import { useLocation } from "react-router-dom";
import {
  Anime,
  Manga,
  SearchResponse,
} from "../../../../../shared/types/types";
import NoData from "../../components/NoData";
import getRelations from "../../services/relations/getRelations";
import { AnimeMangaCard } from "./components/AnimeMangaCard";
import "./ViewTest.css";

export default function viewTest() {
  const SearchResponse = useLocation().state as SearchResponse;

  return (
    <Container className={"container"}>
      {renderAnimeOrManga(SearchResponse.animes)}
      {renderAnimeOrManga(SearchResponse.mangas)}
    </Container>
  );

  function orderByPopularity(e1: any, e2: any) {
    return e1.popularity <= e2.popularity ? -1 : 1;
  }

  function renderAnimeOrManga(entity: Anime[] | Manga[]) {
    return (
      <>
        {entity.length > 0 ? (
          entity.sort(orderByPopularity).map((e) => {
            if (e.isExplicit) return;
            return (
              <Grid key={e.id}>
                <Grid.Col>
                  <AnimeMangaCard
                    title={e.title}
                    source={e.source}
                    id={e.id}
                    image={e.imageUrl}
                    rating={e.source}
                    description={e.synopsis}
                    onClick={() => {
                      getRelations(e.id, e.source);
                    }}
                  ></AnimeMangaCard>
                </Grid.Col>
              </Grid>
            );
          })
        ) : (
          <NoData message="nothing found" />
        )}
      </>
    );
  }
}
