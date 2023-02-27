import express from "express";
import getRelated from "../controllers/Related";

const router = express.Router();

router.post("/", getRelated);

export default router;
