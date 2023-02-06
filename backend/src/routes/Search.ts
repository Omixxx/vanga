import express from "express";
import { search } from "../controllers/Search";

const router = express.Router();

router.post("/", search);

export default router;
