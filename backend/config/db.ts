import { Db, MongoClient } from "mongodb";

let db: Db; // MongoDB database instance

export const connectToDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI as string;

    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }

    try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        db = client.db(); // Use the default database specified in the URI
        console.log("MongoDB connected to", db.databaseName);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw new Error("Fail to connect to MongoDB");
    }
};

export const getDb = (): Db => {
    if (!db) {
        throw new Error("Database instance is not initialized. Call connectToDB first.");
    }
    return db;
};
