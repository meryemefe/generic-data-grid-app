import express from "express";
import { deleteGenericData, listGenericData, updateGenericData } from "../controllers/genericDataController";

const router = express.Router();

router.post("/generic/:modelName", listGenericData);
router.delete("/generic/:modelName/:id", deleteGenericData);
router.put("/generic/:modelName/:id", updateGenericData);

export default router;
