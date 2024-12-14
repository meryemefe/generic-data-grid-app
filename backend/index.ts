import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectToDB, getDb } from "./config/db";
import genericDataRoutes from "./routes/genericDataRoutes";
import modelRoutes from "./routes/modelRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const startServer = async () => {
    try {
        // Connect to the database
        await connectToDB();

        // Pass the database instance to controllers if needed
        const db = getDb();
        console.log("Database instance ready:", db.databaseName);

        // Initialize routes
        app.use("/", modelRoutes);
        app.use("/", genericDataRoutes);


        // Listen to the port
        app.listen(port, () => {
            console.log(`Server is running at port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
