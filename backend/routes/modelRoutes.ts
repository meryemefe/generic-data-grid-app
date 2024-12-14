import express from "express";
import upload from "../config/multer";
import { createModel, deleteModel, importModel, listModels } from "../controllers/modelController";

const router = express.Router();

router.post('/models', createModel);
router.post("/models/import", upload.single("file"), importModel);
router.get("/models", listModels);
router.delete("/models/:name", deleteModel);

export default router;
