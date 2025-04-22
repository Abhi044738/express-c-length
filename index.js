import express from "express";
import cors from "cors";
import { responseHandler } from "./responses.js";
import { compileSource, runProgram } from "./compiler/compiler-runner.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  const inputs = req.body.data;
  try {
    console.log(inputs);
    const output = await runProgram(inputs);
    responseHandler(200, res, output);
  } catch (error) {
    responseHandler(500, res, error);
    console.log(error);
  }
});

app.use((req, res, next) => {
  responseHandler(
    404,
    res,
    `404 Error Cannot ${req.method} ${req.originalUrl}`,
  );
});

app.listen(8080, async () => {
  try {
    await compileSource();
    console.log("Server is running");
  } catch (error) {
    console.log(error);
  }
});
