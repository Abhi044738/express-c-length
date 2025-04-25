import { runProgram } from "../compiler/compiler-runner.js";
import { handleResponse } from "../utils/responses.js";

export const compileHandler = async (req, res) => {
  const inputs = req.body.data;
  try {
    console.log(inputs);
    const output = await runProgram(inputs);
    handleResponse(200, res, output);
  } catch (error) {
    handleResponse(500, res, error);
    console.error(error);
  }
};
