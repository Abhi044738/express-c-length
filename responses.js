export const responseHandler = (statusCode, res, message) => {
  switch (statusCode) {
    case 200:
      res.status(200).set("content-type", "text/plain").json({ message });
      break;
    case 401:
      res.status(401).set("content-type", "text/plain").json({ message });
      break;
    case 404:
      res.status(404).set("content-type", "html").send({ message });
      break;
    case 500:
      res.status(500).set("content-type", "text/plain").json({ message });
      break;
    default:
      res.set("content-type", "text/plain").json({ message });
      break;
  }
};
