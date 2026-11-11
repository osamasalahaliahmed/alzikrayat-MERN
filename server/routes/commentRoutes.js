import express from "express";
import { create } from "../controllers/commentController.js";
import { requireAuth } from "../middleware/auth.js";

const commentRouter = express.Router({ mergeParams: true });
commentRouter.post("/", requireAuth, create);

export default commentRouter;
