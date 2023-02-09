import { SearchRequest } from "../../../../../shared/types/types";
import { SearchResponse } from "../../../../../shared/types/types";
import axios from "axios";

export default async function getSearchResults(
  query: SearchRequest
): Promise<SearchResponse | undefined> {
  return axios
    .post(
      `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT
      }/search`,
      query
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      alert(error);
    });
}
