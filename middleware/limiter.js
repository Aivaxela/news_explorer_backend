const { rateLimit } = require("express-rate-limit");

function handleLimitReached() {
  return Promise.reject(new Error("too many requests"));
}

module.exports.limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: handleLimitReached,
});
