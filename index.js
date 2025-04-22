import express from "express";
import cors from "cors";
import { responseHandler } from "./responses.js";
import { compileSource, runProgram } from "./compiler/compiler-runner.js";
import { compilerRouteHandler } from "./Routes/api/compilerRoute.js";

const PORT = 8080;
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/compiler", (req, res) =>
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
