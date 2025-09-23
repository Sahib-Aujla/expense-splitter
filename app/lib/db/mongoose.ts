import mongoose from 'mongoose';

export const connectMongoDb = async () => {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');
};