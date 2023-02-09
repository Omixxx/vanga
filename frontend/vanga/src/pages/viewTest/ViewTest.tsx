import { useLocation } from "react-router-dom";
import {
  Anime,
  Manga,
  SearchResponse,
} from "../../../../../shared/types/types";

export default function viewTest() {
  const SearchResponse = useLocation().state as SearchResponse;

  console.log(SearchResponse);

  return (
    <div>
      <ul>{renderTitles(SearchResponse.animes)}</ul>
    </div>
  );

  function renderTitles(entity: Anime[] | Manga[]) {
    return entity.map((e) => {
      return <li>{e.title} </li>;
    });
  }
}
