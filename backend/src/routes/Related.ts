import express from "express";
import getRelations from "../controllers/Related";

const router = express.Router();

router.post("/", getRelations);

export default router;
