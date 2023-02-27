import axios from "axios";
import { Source } from "../../../../../shared/types/types";

export default async function getRelated(id: number, source: Source) {
  return axios
    .post(
      `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT
      }/relted`,
      { id, source }
    )
    .then((res) => res.data)
    .catch((err) => alert(err));
}
