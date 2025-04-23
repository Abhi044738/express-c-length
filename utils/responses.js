export const handleResponse = (statusCode, res, message) => {
  switch (statusCode) {
    case 200:
      res.status(200).json({ message });
      break;
    case 401:
      res.status(401).send({ message });
      break;
    case 404:
      res.status(404).send(message);
      break;
    case 500:
      res.status(500).json({ message });
      break;
    default:
      res.send({ message });
      break;
  }
};
