import express from "express";
import { getMockTask } from "../controllers/mock";

const router = express.Router();

router.get("/:id", getMockTask);

export default router;
