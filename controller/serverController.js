import { handleResponse } from "../utils/responses.js";

export const serverHandler = (req, res) => {
  handleResponse(200, res, "server is running");
};
