import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../config/db";
import { DbFilterProcessor } from "../utils/dbFilterProcessor";

export const listGenericData = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {modelName} = req.params;
        const db = getDb();

        // Ensure the model exists in CollectionMetadata
        const model = await db.collection("CollectionMetadata").findOne({name: modelName});
        if (!model) {
            return res.status(404).json({message: `Model '${modelName}' not found`});
        }

        const fields = model.fields || {};

        // Parse request body for filters, pagination, and sorting
        const {
            page = 1,
            pageSize = 20,
            sortField = "_id",
            sortOrder = "asc",
            filter = {},
        } = req.body;

        const order = sortOrder === "desc" ? -1 : 1;

        // Construct MongoDB filters using the FilterProcessor utility
        const mongoFilters = DbFilterProcessor.constructMongoFilters(filter, fields);
        console.log("Mongo filters:", mongoFilters);

        // Fetch data with pagination, sorting, and filtering
        const collection = db.collection(modelName);
        const total = await collection.countDocuments(mongoFilters);
        const data = await collection
            .find(mongoFilters)
            .sort({[sortField]: order})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .toArray();

        res.status(200).json({data, total, fields});
    } catch (err) {
        next(err);
    }
};


export const deleteGenericData = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {modelName, id} = req.params; // Model name and document ID from URL params
        const db = getDb();

        // Check if the model exists in metadata
        const metadata = await db.collection("CollectionMetadata").findOne({name: modelName});
        if (!metadata) {
            return res.status(404).json({message: `Model '${modelName}' not found`});
        }

        // Validate the ObjectId
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({message: `Invalid document ID: ${id}`});
        }

        // Delete the document from the model's collection
        const result = await db.collection(modelName).deleteOne({_id: new ObjectId(id)});

        if (result.deletedCount === 0) {
            return res.status(404).json({message: `Document with ID '${id}' not found in model '${modelName}'.`});
        }

        res.status(200).json({message: `Document with ID '${id}' deleted successfully from model '${modelName}'.`});
    } catch (err) {
        next(err);
    }
};