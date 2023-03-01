import axios from "axios";
import { Content, Source } from "../../../../../shared/types/types";

export default async function getRelated(id: number, source: Source): Promise<Content> {
  return axios
    .post(
      `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT
      }/search/id/related`,
      { id, source }
    )
    .then((res) => res.data)
    .catch((err) => alert(err));
}
