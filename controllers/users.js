const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const { error } = require("console");

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      return Promise.reject(new Error("user not found"));
    })
    .then((user) => {
      res.send({ email: user.email, username: user.username });
    })
    .catch((err) => console.error(err));
};

module.exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email.toLowerCase(), password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      const id = mongoose.Types.ObjectId(user._id).toString();
      res.send({
        token,
        username: user.username,
        id,
      });
    })
    .catch((err) => console.error(err));
};

module.exports.signup = (req, res) => {
  const { email, password, username } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, username }).then((user) => {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        res.send({
          token,
          email: email,
          username: username,
        });
      });
    })
    .catch((err) => console.error(err));
};
