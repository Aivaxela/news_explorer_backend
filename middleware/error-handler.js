module.exports.errorHandler = (err, req, res, next) => {
  const newError = new Error("default error mesageasg");
  newError.statusCode = 405;
  throw new newError();
};

module.exports.errorSender = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(err);
  res.status(statusCode).send({
    message: statusCode === 500 ? "default error message" : message,
  });
};
