import mongoose from "mongoose";

const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@linked-clon.ehhwq.mongodb.net/?retryWrites=true&w=majority&appName=linked-clon`;

if (!connectionString) {
  throw new Error("connectionString is not valid");
}

export const connectDB = async () => {
  if (mongoose.connection?.readyState >= 1) {
    return;
    }

    try {
        console.log("conecting to mongodb");
        
        await mongoose.connect(connectionString)
    } catch (error) {
        console.log("error connecting to mongodb", error);
        
    }
    
};
