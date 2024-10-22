const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const { error } = require("console");

module.exports.getCurrentUser = (req, res) => {
  console.log("getting user");
};

module.exports.createUser = (req, res) => {
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name }).then((user) => {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
      });
      res.send({
        token,
        email: email,
        name: name,
      });
    })
    .catch((err) => console.error(err));
};
