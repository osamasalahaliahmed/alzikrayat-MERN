//dotenv
import dotenv from "dotenv";
dotenv.config();

//validation.js
import { validateSignup } from "./middleware/validation.js";


//mongoose
import mongoose from "mongoose";


//express
import express from "express";
const app = express();
app.use(express.json());
const port = process.env.port;

const startServer = async () => {
  await connectDB();

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  app.post("/signup", (req, res) => {
    const { error, value } = validateSignup(req.body)
    if (error) {
      res.status(400).send(error)
    } else {
      res.sendStatus(200)
    }
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
