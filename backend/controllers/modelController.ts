import csvParser from "csv-parser";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { getDb } from "../config/db";
import { DbFilterProcessor } from "../utils/dbFilterProcessor";

export const createModel = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {name, fields} = req.body;

        // Validate inputs
        if (!name || !fields || !Array.isArray(fields) || fields.length === 0) {
            return res.status(400).json({message: "Name and valid fields are required"});
        }

        const db = getDb(); // Get the database instance

        // Check if the collection already exists
        const collections = await db.listCollections({name}).toArray();
        if (collections.length > 0) {
            return res.status(400).json({message: `Model '${name}' already exists`});
        }

        // Convert fields to metadata schema
        const schemaFields = fields.reduce((acc: Record<string, any>, field: { name: string; type: string }) => {
            if (!field.name || !field.type || !["text", "number", "date"].includes(field.type)) {
                throw new Error("Invalid field format");
            }
            acc[field.name] = {type: field.type};
            return acc;
        }, {});

        // Create collection
        await db.createCollection(name);

        // Save metadata
        await db.collection("CollectionMetadata").insertOne({
            name,
            fields: schemaFields,
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
        const columnTypes: Record<string, string> = {};

        // Helper function to infer type based on value in CSV
        const inferDataType = (value: any): string => {
            if (!value || value.trim() === "") return "text";
            if (!isNaN(Number(value))) return "number";
            if (!isNaN(Date.parse(value))) return "date";
            return "text";
        };

        // Helper function to convert value to its inferred type
        const convertValue = (value: any, type: string): any => {
            if (type === "number") return Number(value);
            if (type === "date") return new Date(value);
            return value; // Default to text
        };

        // Parse the CSV file
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("headers", (headers: string[]) => {
                headers.forEach((header) => {
                    columnTypes[header] = ""; // Initialize column types
                });
            })
            .on("data", (row) => {
                rows.push(row);

                // Infer column types based on the rows
                for (const [key, value] of Object.entries(row)) {
                    const inferredType = inferDataType(value);
                    if (columnTypes[key] !== "text" && columnTypes[key] !== inferredType) {
                        columnTypes[key] = inferredType;
                    }
                }
            })
            .on("end", async () => {
                try {
                    // Check if the collection exists
                    const collections = await db.listCollections({name: modelName}).toArray();
                    if (collections.length > 0) {
                        return res.status(400).json({message: `Model '${modelName}' already exists`});
                    }

                    // Dynamically create a schema based on inferred column types
                    const schemaFields = Object.entries(columnTypes).reduce((acc, [key, type]) => {
                        acc[key] = {type};
                        return acc;
                    }, {} as Record<string, any>);

                    console.log("Inferred schema fields:", schemaFields);

                    // Convert rows to have correct data types
                    const convertedRows = rows.map((row) =>
                        Object.entries(row).reduce((convertedRow, [key, value]) => {
                            const fieldType = columnTypes[key];
                            convertedRow[key] = convertValue(value, fieldType);
                            return convertedRow;
                        }, {} as Record<string, any>)
                    );

                    // Create the collection and insert the data
                    const collection = db.collection(modelName);
                    await collection.insertMany(convertedRows);

                    // Save metadata with field types
                    await db.collection("CollectionMetadata").insertOne({
                        name: modelName,
                        fields: schemaFields,
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

        const fields = {
            name: {
                type: "string",
            },
            createdAt: {
                type: "date",
            }
        };

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
        const collection = db.collection("CollectionMetadata");
        const total = await collection.countDocuments(mongoFilters);
        const data = await collection
            .find(mongoFilters)
            .sort({[sortField]: order})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .toArray();

        // Respond with models and total count
        res.status(200).json({models: data, total});
    } catch (err) {
        next(err);
    }
};

export const deleteModel = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {name} = req.params;
        const db = getDb();

        // Check if the model exists
        const metadata = await db.collection("CollectionMetadata").findOne({name});
        if (!metadata) {
            return res.status(404).json({message: `Model '${name}' not found`});
        }

        // Remove the metadata for the model
        await db.collection("CollectionMetadata").deleteOne({name});

        // Drop the collection corresponding to the model
        await db.collection(name).drop();

        res.status(200).json({message: `Model '${name}' deleted successfully.`});
    } catch (err) {
        next(err);
    }
};
