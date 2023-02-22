import express from "express";
import getRelations from "../controllers/Relation";

const router = express.Router();

router.post("/", getRelations);

export default router;
