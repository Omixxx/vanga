import { SearchRequest } from "../../../../../types/types";
import axios from "axios";

export default async function getSearchResults(
  query: SearchRequest
): Promise<string | undefined> {
  try {
    return axios.post(
      `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT
      }/search`,
      query
    );
  } catch (error) {
    console.log("afa");
    alert(error);
    return;
  }
}
