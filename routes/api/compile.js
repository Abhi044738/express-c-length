import express from "express";
import { compileHandler } from "../../controller/compileController.js";

const router = express.Router();

router.post("/compiler", compileHandler);

export { router as compileRoute };
