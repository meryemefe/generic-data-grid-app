import { NextFunction, Request, Response } from "express";
import { getDb } from "../config/db";

export const listGenericData = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {name} = req.params;
        const db = getDb();

        // Ensure the model exists in CollectionMetadata
        const model = await db.collection("CollectionMetadata").findOne({name});
        if (!model) {
            return res.status(404).json({message: `Model '${name}' not found`});
        }

        const fields = model.fields || [];

        // Parse query parameters
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 20;
        const sortField = req.query.sortField as string || "_id";
        const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
        const filter = req.query.filter ? JSON.parse(req.query.filter as string) : {};

        // Fetch data with pagination, sorting, and filtering
        const collection = db.collection(name);
        const total = await collection.countDocuments(filter);
        const data = await collection
            .find(filter)
            .sort({[sortField]: sortOrder})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .toArray();

        res.status(200).json({data, total, fields});
    } catch (err) {
        next(err);
    }
};
