const mongoose = require("mongoose");
const pool = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const NotFoundError = require("../errors/not-found");
const { userNotFoundMessage } = require("../utils/error-messages");
const jwtKey = process.env.JWT_SECRET || "jwt-secret";
const SignInFailError = require("../errors/signin-fail");
const { signinFailErrorMessage } = require("../utils/error-messages");

module.exports.getCurrentUser = (req, res, next) => {
  console.log(req.user);

  // User.findById(req.user._id)
  //   .orFail(() => Promise.reject(new NotFoundError(userNotFoundMessage)))
  //   .then((user) => res.send({ email: user.email, username: user.username }))
  //   .catch(next);
};

module.exports.signin = (req, res, next) => {
  let { email, password } = req.body;

  return new Promise((resolve, reject) => {
    if (!email || !password) {
      return reject(new Error("missing field"));
    }

    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email.toLowerCase()],
        (err, result) => {
          connection.release();
          if (err) {
            return reject(err);
          }
          if (!result || !result.length) {
            return reject(new NotFoundError(userNotFoundMessage));
          }
          const user = result[0];
          bcrypt
            .compare(password, user.password)
            .then((matched) => {
              if (!matched) {
                return reject(new SignInFailError(signinFailErrorMessage));
              }
              resolve(user);
            })
            .catch(reject);
        }
      );
    });
  })
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, jwtKey, {
        expiresIn: "7d",
      });
      res.send({
        token,
        username: user.username,
      });
    })
    .catch(next);
};

module.exports.signup = (req, res, next) => {
  const { email, password, username } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return next(err);
        }
        connection.query(
          "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
          [email, hash, username],
          (err, result) => {
            console.log(result);
            connection.release();
            if (err) {
              return next(err);
            }
            const token = jwt.sign({ _id: result.insertId }, jwtKey, {
              expiresIn: "7d",
            });
            res.send({
              token,
              email,
              username,
            });
          }
        );
      });
    })
    .catch(next);
};
