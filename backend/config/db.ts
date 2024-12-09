import { connect, set } from 'mongoose';

export const connectToDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI as string;

    try {
        set('strictQuery', false);
        const db = await connect(MONGODB_URI);
        console.log('MongoDB connected to', db.connection.name);
    } catch (error) {
        console.error(error);
        throw new Error('Fail to connect to MongoDB');
    }
};