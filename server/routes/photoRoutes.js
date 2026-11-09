import express from "express"
import { getAll, getOne, create, remove } from "../controllers/photoController.js";
import { requireAuth } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
const photoRouter = express.Router();
photoRouter.get("/",getAll)
photoRouter.get("/:id", getOne)
photoRouter.post("/", requireAuth, upload.single("photo"), create);
photoRouter.delete("/:id", requireAuth, remove);
export default photoRouter;
