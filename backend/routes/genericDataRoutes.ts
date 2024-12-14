import express from "express";
import { deleteGenericData, listGenericData } from "../controllers/genericDataController";

const router = express.Router();

router.get("/generic/:modelName", listGenericData);
router.delete("/generic/:modelName/:id", deleteGenericData);

export default router;
