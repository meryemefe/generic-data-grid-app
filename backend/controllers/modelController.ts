import csvParser from "csv-parser";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { getDb } from "../config/db";

export const createModel = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {name, fields} = req.body;

        // Validate inputs
        if (!name || !fields) {
            return res.status(400).json({message: "Name and fields are required"});
        }

        const db = getDb(); // Get the database instance

        // Check if the collection already exists
        const collections = await db.listCollections({name}).toArray();
        if (collections.length > 0) {
            return res.status(400).json({message: `Model '${name}' already exists`});
        }

        // Create collection (MongoDB doesn't enforce schemas but we'll save metadata)
        await db.createCollection(name);

        // Save metadata
        await db.collection("CollectionMetadata").insertOne({
            name,
            fields,
            createdAt: new Date(),
        });

        res.status(201).json({message: `Model '${name}' created successfully`});
    } catch (err) {
        next(err);
    }
};

export const importModel = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {modelName} = req.body;

        // Validate inputs
        if (!modelName || !req.file) {
            return res.status(400).json({message: "Model name and CSV file are required"});
        }

        const db = getDb(); // Get the database instance
        const filePath = req.file.path;
        const rows: any[] = [];
        const schemaFields: Record<string, any> = {};

        // Parse the CSV file
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("headers", (headers: string[]) => {
                headers.forEach((header) => {
                    schemaFields[header] = true; // Mark fields as existing
                });
            })
            .on("data", (row) => {
                rows.push(row);
            })
            .on("end", async () => {
                try {
                    // Check if the collection exists
                    const collections = await db.listCollections({name: modelName}).toArray();
                    if (collections.length > 0) {
                        return res.status(400).json({message: `Model '${modelName}' already exists`});
                    }

                    // Create the collection and insert the data
                    const collection = db.collection(modelName);
                    await collection.insertMany(rows);

                    // Save metadata
                    await db.collection("CollectionMetadata").insertOne({
                        name: modelName,
                        fields: Object.keys(schemaFields),
                        createdAt: new Date(),
                    });

                    // Clean up the uploaded file
                    fs.unlinkSync(filePath);

                    res.status(201).json({
                        message: "Model created and data imported successfully",
                        rowCount: rows.length,
                    });
                } catch (err) {
                    next(err);
                }
            })
            .on("error", (err) => {
                next(err);
            });
    } catch (err) {
        next(err);
    }
};

export const listModels = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const db = getDb();

        // Pagination
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 20;

        // Sorting
        const sortField = req.query.sortField as string || "_id"; // Default sort field
        const sortOrder = req.query.sortOrder === "desc" ? -1 : 1; // Default to ascending

        // Filtering
        const filter = req.query.filter ? JSON.parse(req.query.filter as string) : {};

        // MongoDB query
        const query = Object.entries(filter).reduce((acc, [key, value]) => {
            // Example: If filter includes { name: "test" }, MongoDB will match { name: { $regex: "test", $options: "i" } }
            acc[key] = {$regex: value, $options: "i"};
            return acc;
        }, {} as Record<string, any>);

        // Get total count for pagination
        const total = await db.collection("CollectionMetadata").countDocuments(query);

        // Get models with filtering, sorting, and pagination
        const models = await db.collection("CollectionMetadata")
            .find(query)
            .sort({[sortField]: sortOrder})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .toArray();

        // Respond with models and total count
        res.status(200).json({models, total});
    } catch (err) {
        next(err);
    }
};

