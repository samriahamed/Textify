import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn =await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB CONNECTED:", conn.connection.host)
    } catch (error) {
        console.error("MongoDB CONNECTION ERROR:", error)
        process.exit(1); // 1 indicates failure, 0 indicates success
    }
     
};
