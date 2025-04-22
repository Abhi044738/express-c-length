export const responseHandler = (statusCode, res, message) => {
  switch (statusCode) {
    case 200:
      res.status(200).json({ message });
      break;
    case 404:
      res.status(404).set("content-type", "html").json({ message });
    case 500:
      res.status(500).json({ message });
    default:
      res.json({ message });
      break;
  }
};
