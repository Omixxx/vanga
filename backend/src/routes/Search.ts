import express from "express";
import { searchById, searchByTitle, searchRelatedById } from "../controllers/Search";

const router = express.Router();

router.post("/title", searchByTitle);
router.post("/id", searchById);
router.post("/id/related", searchRelatedById)

export default router;
