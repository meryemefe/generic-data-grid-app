import csvParser from "csv-parser";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import fs from "fs";

export const createModel = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {name, fields} = req.body;

        // Check if name and fields are provided
        if (!name || !fields) {
            return res.status(400).json({message: "Name and fields are required"});
        }

        // Check if the model already exists
        if (mongoose.models[name]) {
            return res.status(400).json({message: `Model '${name}' already exists`});
        }

        // Dynamically create a collection schema
        const schemaFields: any = {};
        fields.forEach((field: string) => {
            schemaFields[field] = {type: mongoose.Schema.Types.Mixed};
        });

        const schema = new mongoose.Schema(schemaFields, {timestamps: true});
        mongoose.model(name, schema);

        return res.status(201).json({message: `Model '${name}' created successfully`});
    } catch (err: unknown) {
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

        const filePath = req.file.path;
        const rows: any[] = [];

        // Parse the CSV file to determine the field names
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("headers", async (headers: string[]) => {
                try {
                    // Create schema fields based on CSV headers
                    const schemaFields: Record<string, any> = {};
                    headers.forEach((header) => {
                        schemaFields[header] = {type: mongoose.Schema.Types.Mixed};
                    });

                    // Create a new schema and model dynamically
                    const schema = new mongoose.Schema(schemaFields, {timestamps: true});
                    const dynamicModel = mongoose.model(modelName, schema);

                    // Collect data rows
                    fs.createReadStream(filePath)
                        .pipe(csvParser())
                        .on("data", (row) => {
                            rows.push(row);
                        })
                        .on("end", async () => {
                            try {
                                // Insert data into the newly created model
                                await dynamicModel.insertMany(rows);

                                // Clean up the uploaded file
                                fs.unlinkSync(filePath);

                                // Respond with success
                                res.status(201).json({
                                    message: "Model created and data imported successfully",
                                    rowCount: rows.length
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
            })
            .on("error", (err) => {
                next(err);
            });
    } catch (err: unknown) {
        next(err);
    }
};
