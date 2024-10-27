const DefaultError = require("../errors/default");
const BadRequestError = require("../errors/bad-request");
const DuplicateItemError = require("../errors/duplicate");
const ForbiddenError = require("../errors/forbidden");
const NotFoundError = require("../errors/not-found");
const RateLimitExceededError = require("../errors/rate-limit-exceeded");
const SignInFailError = require("../errors/signin-fail");
const {
  castErrorMessage,
  validationErrorMessage,
  signinFailErrorMessage,
  badTokenErrorMessage,
  forbiddenErrorMessage,
  duplicateEmailErrorMessage,
  defaultErrorMessage,
  rateLimitReachedMessage,
} = require("../utils/error-messages");

module.exports.errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    throw new DuplicateItemError(duplicateEmailErrorMessage);
  }

  switch (err.name) {
    case "CastError":
      throw new BadRequestError(castErrorMessage);
    case "ValidationError":
      throw new BadRequestError(validationErrorMessage);
    case "SignInFail":
      throw new SignInFailError(signinFailErrorMessage);
    case "Unauthorized":
      throw new SignInFailError(badTokenErrorMessage);
    case "Forbidden":
      throw new ForbiddenError(forbiddenErrorMessage);
    default:
      next(err);
  }
};

module.exports.errorSender = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "An error has occurred on the server" : message,
  });
};
