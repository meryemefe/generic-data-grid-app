import dotenv from 'dotenv';
import express from "express";
import cors from 'cors';
import morgan from "morgan";
import { connectToDB } from "./config/db";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

const startServer = async () => {
    try {
        // Connect to the database
        await connectToDB();

        // Morgan middleware configuration to use Winston for logging
        app.use(morgan('dev'));

        // TODO Initialize routes


        // Listen to the port
        app.listen(port, () => {
            console.log(`Server is running at port ${port}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

startServer()
