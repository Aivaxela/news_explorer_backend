const mongoose = require("mongoose");
const validator = require("validator");

const articleSchema = new mongoose.Schema({
  urlToImage: {
    type: String,
    unique: false,
    validate: {
      validator(value) {
        if (value) return validator.isURL(value);
      },
      message: "Invalid image URL",
    },
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "Invalid article URL",
    },
  },
  keyword: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("article", articleSchema);
