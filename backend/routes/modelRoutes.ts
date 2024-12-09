import express from "express";
import { createModel } from "../controllers/modelController";

const router = express.Router();

router.post('/models', createModel);

export default router;
