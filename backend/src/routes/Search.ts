import express from "express";
import { search } from "../controllers/Search";

const router = express.Router();

router.get("/", search);

export default router;
