export const compilerRouteHandler = async (
  req,
  res,
  runProgram,
  responseHandler,
) => {
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
