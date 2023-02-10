import { Button } from "@mantine/core";
import { useLocation } from "react-router-dom";
import {
  Anime,
  Manga,
  SearchResponse,
} from "../../../../../shared/types/types";
import getRelations from "../../services/relations/getRelations";

export default function viewTest() {
  const SearchResponse = useLocation().state as SearchResponse;

  console.log(SearchResponse);

  return (
    <div>
      <ul>
        <h2>Animes</h2>
      </ul>
      <ul>{renderTitles(SearchResponse.animes)}</ul>
      <ul>
        <h2>Mangas</h2>
      </ul>
      <ul>{renderTitles(SearchResponse.mangas)}</ul>
    </div>
  );

  function renderTitles(entity: Anime[] | Manga[]) {
    return entity.map((e) => {
      return (
        <li>
          {e.id}: {e.title}
          <Button
            size="xs"
            onClick={() => {
              getRelations(e.id, e.sourceType);
            }}
          >
            send
          </Button>
        </li>
      );
    });
  }
}
