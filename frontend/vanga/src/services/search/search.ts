import { Content, SearchByIdResponse, SearchByTitleRequest, Source } from "../../../../../shared/types/types";
import { } from "../../../../../shared/types/types";
import axios from "axios";

export async function searchByTitle(
  title: SearchByTitleRequest
): Promise<Content | undefined> {
  return axios
    .post(
      `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT
      }/search/title`,
      title
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      alert(error);
    });
}

export async function searchById(id: number | null, source: Source): Promise<SearchByIdResponse> {
  return axios
    .post(
      `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT
      }/search/id`,
      { id, source }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      alert(error);
    });
}

export async function searchRelatedById(id: number | null, source: Source): Promise<Content> {
  return axios
    .post(
      `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT
      }/search/related/id`,
      { id, source }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      alert(error);
    });
}
