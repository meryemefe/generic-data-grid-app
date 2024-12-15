import express from "express";
import {
    deleteGenericData,
    listGenericData,
    saveGenericData,
    updateGenericData
} from "../controllers/genericDataController";

const router = express.Router();

router.post("/generic/:modelName", saveGenericData);
router.post("/generic/:modelName/list", listGenericData);
router.delete("/generic/:modelName/:id", deleteGenericData);
router.put("/generic/:modelName/:id", updateGenericData);

export default router;
