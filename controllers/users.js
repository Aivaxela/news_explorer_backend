const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const { error } = require("console");

module.exports.getCurrentUser = (req, res) => {
  req.user = { _id: "6716fc63e8415c6737d5eb49" };
  User.findById(req.user._id)
    .orFail(() => {
      return Promise.reject(new Error("user not found"));
    })
    .then((user) => {
      res.send({ data: user });
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
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name }).then((user) => {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        res.send({
          token,
          email: email,
          name: name,
        });
      });
    })
    .catch((err) => console.error(err));
};
