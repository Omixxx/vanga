import axios from "axios";
import { Source } from "../../../../../shared/types/types";

export default async function getRelations(id: number, source: Source) {
  return axios
    .post(
      `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT
      }/relation`,
      { id, source }
    )
    .then((res) => res.data)
    .catch((err) => alert(err));
}
