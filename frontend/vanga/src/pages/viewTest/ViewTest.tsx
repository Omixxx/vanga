import { Button, Container, Grid } from "@mantine/core";
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
    <Container my={"xl"}>
      <Grid
        style={{
          display: "flex",
          height: "200px",
        }}
      >
        <Grid.Col>{renderAnimeOrManga(SearchResponse.animes)}</Grid.Col>
        <Grid.Col>{renderAnimeOrManga(SearchResponse.mangas)}</Grid.Col>
      </Grid>
    </Container>
  );

  function renderAnimeOrManga(entity: Anime[] | Manga[]) {
    return entity.map((e) => {
      return (
        <Container>
          <Grid>
            <Grid.Col>
              <AnimeMangaCard
                title={e.title}
                image={e.image}
                link={e.image}
                description={"ciao"}
                author={{ name: "ciao", image: "ciao" }}
                rating={e.sourceType}
              >
                <Button
                  size="xs"
                  onClick={() => {
                    getRelations(e.id, e.sourceType);
                  }}
                >
                  send
                </Button>
              </AnimeMangaCard>
            </Grid.Col>
          </Grid>
        </Container>
      );
    });
  }
}
