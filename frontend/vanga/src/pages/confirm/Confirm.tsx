import { Container, Grid } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Anime, Content, Manga } from "../../../../../shared/types/types";
import NoData from "../../components/NoData";
import getRelated from "../../services/relations/getRelated";
import orderByPopularity from "../../utils/orderByPopularity";
import { AnimeMangaCard } from "../viewTest/components/AnimeMangaCard";

export default function Confirm() {
  const selectedContent = useLocation().state;
  const [related, setRelated] = useState<Content>({ animes: [], mangas: [] })


  useEffect(() => {
    const init = async () => {
      const related = await getRelated(selectedContent.id, selectedContent.source)
      console.log(related);

      setRelated(related)
    }
    init()
  }, [])


  return (
    <Container className={"container"}>
      {renderAnimeOrManga(related.animes)}
      {renderAnimeOrManga(related.mangas)}
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
