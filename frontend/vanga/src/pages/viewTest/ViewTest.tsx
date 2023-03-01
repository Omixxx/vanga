import { Container, Grid } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Anime,
  Content,
  Manga,
} from "../../../../../shared/types/types";
import NoData from "../../components/NoData";
import getRelated from "../../services/relations/getRelated";
import orderByPopularity from "../../utils/orderByPopularity";
import { AnimeMangaCard } from "./components/AnimeMangaCard";
import "./ViewTest.css";

export default function viewTest() {
  const Content = useLocation().state as Content;
  const navigate = useNavigate()

  return (
    <Container className={"container"}>
      {renderAnimeOrManga(Content.animes)}
      {renderAnimeOrManga(Content.mangas)}
    </Container>
  );


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
                      navigate("/confirm", {
                        state: {
                          id: e.id,
                          source: e.source,
                        }
                      })
                    }}
                  ></AnimeMangaCard>
                </Grid.Col>
              </Grid>
            );
          })
        ) : (
          <NoData message="nothing found" />
        )
        }
      </>
    );
  }
}
