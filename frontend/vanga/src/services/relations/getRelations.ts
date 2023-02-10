import axios from "axios";
import { SourceType } from "../../../../../shared/types/types";

export default async function getRelations(id: number, sourceType: SourceType) {
  return axios
    .post(
      `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT
      }/relation`,
      { id, sourceType }
    )
    .then((res) => res.data)
    .catch((err) => alert(err));
}
