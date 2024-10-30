const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const SignInFailError = require("../errors/signin-fail");
const NotFoundError = require("../errors/not-found");
const {
  signinFailErrorMessage,
  userNotFoundMessage,
} = require("../utils/error-messages");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  username: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  if (!email || !password) {
    return Promise.reject(new Error("missing field"));
  }
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotFoundError(userNotFoundMessage));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new SignInFailError(signinFailErrorMessage));
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
