import axios from "axios";
import { Source } from "../../../../../shared/types/types";

export default async function getRelations(id: number, sourceType: Source) {
  return axios
    .post(
      `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT
      }/relation`,
      { id, sourceType }
    )
    .then((res) => res.data)
    .catch((err) => alert(err));
}
