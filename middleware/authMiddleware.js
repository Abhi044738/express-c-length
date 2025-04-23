export const AuthHandler = (req, res, handleResponse, next, authToken) => {
  console.log(req.headers.authorization);
  if (req.headers.authorization === authToken) {
    console.log("matched");
    next();
  } else {
    console.log("not matched");
    handleResponse(401, res, "Unauthorized access");
  }
};
