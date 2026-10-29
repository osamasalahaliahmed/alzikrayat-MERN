import express from "express"
import { getAll,getOne } from "../controllers/photoController.js";
const photoRouter = express.Router();
photoRouter.get("/",getAll)
photoRouter.get("/:id", getOne)
export default photoRouter;
