//dotenv
import dotenv from "dotenv";
dotenv.config();


//mongoose
import mongoose from "mongoose";


//express
import express from "express";
const app = express();
const port = process.env.port;

const startServer = async () => {
  await connectDB();

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

//mongoose
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};



startServer();