import express from "express";
import upload from "../config/multer";
import { createModel, importModel } from "../controllers/modelController";

const router = express.Router();

router.post('/models', createModel);
router.post("/models/import", upload.single("file"), importModel);

export default router;
