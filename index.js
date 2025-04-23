import express from "express";
import cors from "cors";
import { responseHandler } from "./responses.js";
import { compileSource } from "./compiler/compiler-runner.js";
import { router as compileRoute } from "./routes/api/compile.js";

import dotenv from "dotenv";
import { appendFile } from "fs";

const PORT = process.env.PORT || 8080;
const authToken = process.env.AUTH_TOKEN || "acke";

const app = express();
app.use(cors());
app.use(express.json());

const AuthHandler = (req, res, responseHandler, next, authToken) => {
  console.log(req.headers.authorization);
  if (req.headers.authorization === authToken) {
    console.log("matched");
    next();
  } else {
    console.log("not matched");
    responseHandler(401, res, "Unauthorized access");
  }
};

app.use((req, res, next) =>
  AuthHandler(req, res, responseHandler, next, authToken),
);

app.use("/api", compileRoute);

app.use("*", (req, res) => {
  responseHandler(
    404,
    res,
    `<p>404 Error Cannot ${req.method} ${req.originalUrl}</p>`,
  );
});

const startServer = async () => {
  try {
    await compileSource();
    app.listen(PORT, () => {
      console.log("Server is running");
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
