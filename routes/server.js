import express from "express";
import { serverHandler } from "../controller/serverController.js";
const router = express.Router();

router.get("/", serverHandler);

export { router as serverRoute };
