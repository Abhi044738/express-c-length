import { runProgram } from "../compiler/compiler-runner.js";
import { responseHandler } from "../responses.js";

export const compileHandler = async (req, res) => {
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
