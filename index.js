import express from "express";
import cors from "cors";
import { compileSource } from "./compiler/compiler-runner.js";
import { compileRoute } from "./routes/api/compile.js";
import { serverRoute } from "./routes/server.js";
import { handleResponse } from "./utils/responses.js";
import { AuthHandler } from "./middleware/authMiddleware.js";

import dotenv from "dotenv";

const PORT = process.env.PORT || 8080;
const authToken = process.env.AUTH_TOKEN || "acke";

const app = express();
app.use(cors());
app.use(express.json());


app.use(serverRoute);
app.use((req, res, next) =>
  AuthHandler(req, res, handleResponse, next, authToken),
);

app.use("/api", compileRoute);

app.use((req, res) => {
  handleResponse(
    404,
    res,
    `<h1>404 Error Cannot ${req.method} ${req.originalUrl}</h1>`,
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
