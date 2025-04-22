import express from "express";
import cors from "cors";
import { responseHandler } from "./responses.js";
import { compileSource, runProgram } from "./compiler/compiler-runner.js";

const PORT = 8080;
const app = express();
app.use(cors());
app.use(express.json());

const compilerRouteHandler = async (req, res, runProgram, responseHandler) => {
  const inputs = req.body.data;
  try {
    console.log(inputs);
    const output = await runProgram(inputs);
    responseHandler(200, res, output);
  } catch (error) {
    responseHandler(500, res, error);
    console.log(error);
  }
};

app.post(
  "/api/compiler",
  compilerRouteHandler(req, res, runProgram, responseHandler),
);

app.use((req, res) => {
  responseHandler(
    404,
    res,
    `<p>404 Error Cannot ${req.method} ${req.originalUrl}</p>`,
  );
});

app.listen(PORT, async () => {
  try {
    await compileSource();
    console.log("Server is running");
  } catch (error) {
    console.log(error);
  }
});
