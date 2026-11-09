import express from "express";
import authRouter from "./routes/authRoutes.js"
import photoRouter from "./routes/photoRoutes.js"
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo"
import { errorHandler } from "./middleware/errorHandler.js";
dotenv.config();


const PORT = process.env.port;
const mongoUrl=process.env.MONGODB_URI
const sessionkey = process.env.SESSION_SECRET

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(session({
  secret: sessionkey,
  store: MongoStore.create({
    mongoUrl: mongoUrl
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false
  }

}))

//Routes
app.use("/api/auth", authRouter)
app.use("/api/photos",photoRouter)
app.use(errorHandler);


const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
};

//mongoose
const connectDB = async () => {
  try {

    const conn = await mongoose.connect(mongoUrl);
    // await mongoose.connection.dropDatabase();
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};



startServer();
