const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const NotFoundError = require("../errors/not-found");
const { userNotFoundMessage } = require("../utils/error-messages");
const jwtKey = process.env.JWT_SECRET || "jwt-secret";

module.exports.getCurrentUser = (req, res, next) =>
  User.findById(req.user._id)
    .orFail(() => Promise.reject(new NotFoundError(userNotFoundMessage)))
    .then((user) => res.send({ email: user.email, username: user.username }))
    .catch(next);

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email.toLowerCase(), password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, jwtKey, {
        expiresIn: "7d",
      });

      const id = mongoose.Types.ObjectId(user._id).toString();
      res.send({
        token,
        username: user.username,
        id,
      });
    })
    .catch(next);
};

module.exports.signup = (req, res, next) => {
  const { email, password, username } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, username })
        .then((user) => {
          const token = jwt.sign({ _id: user._id }, jwtKey, {
            expiresIn: "7d",
          });
          res.send({
            token,
            email,
            username,
          });
        })
        .catch(next);
    })
    .catch(next);
};
