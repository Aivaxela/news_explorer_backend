const DefaultError = require("../utils/errors");
const {
  castErrorMessage,
  validationErrorMessage,
  signinFailErrorMessage,
  badTokenErrorMessage,
  forbiddenErrorMessage,
  userNotFoundMessage,
  itemNotFoundMessage,
  pageNotFoundMessage,
  duplicateEmailErrorMessage,
  defaultErrorMessage,
  rateLimitReachedMessage,
} = require("../utils/error-messages");

module.exports.errorHandler = (err, req, res, next) => {
  throw new DefaultError(defaultErrorMessage);
};

module.exports.errorSender = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(err);
  res.status(statusCode).send({
    message: statusCode === 500 ? "default error message" : message,
  });
};
