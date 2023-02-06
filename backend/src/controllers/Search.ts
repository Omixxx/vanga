import exists from "../utils/exists";
import { isSearchRequest, SearchRequest } from "../../../types/types";
import assert from "assert";
import { Request, Response } from "express";

export async function search(req: Request, res: Response) {
  assert(exists(req.body), "Request body is undefined");
  assert(
    isSearchRequest(req.body),
    "Request body is not of type SearchRequest"
  );

  const searchRequest: SearchRequest = req.body;

  console.log(searchRequest);

  res.status(200).send({ message: "Success" });
}
