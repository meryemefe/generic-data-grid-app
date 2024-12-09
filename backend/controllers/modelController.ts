import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

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
