import { Button } from "@mantine/core";
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
    <div>
      <ul>{renderTitles(SearchResponse.animes)}</ul>
      <ul>{renderTitles(SearchResponse.mangas)}</ul>
    </div>
  );

  function renderTitles(entity: Anime[] | Manga[]) {
    return entity.map((e) => {
      return (
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
      );
    });
  }
}
