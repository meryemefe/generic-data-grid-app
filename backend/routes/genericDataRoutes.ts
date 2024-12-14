import express from "express";
import { listGenericData } from "../controllers/genericDataController";

const router = express.Router();

router.get("/generic/:name", listGenericData);

export default router;
