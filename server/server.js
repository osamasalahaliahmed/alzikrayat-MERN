import express from "express";
import router from "./routes/authRoutes.js"
import dotenv from "dotenv";
import mongoose from "mongoose";



dotenv.config();
const app = express();



app.use(express.json());
app.use("/api/auth",router)
const port = process.env.port;

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

//mongoose
const connectDB = async () => {
  try {

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    // await mongoose.connection.dropDatabase();
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};



startServer();
