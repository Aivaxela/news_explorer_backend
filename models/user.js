const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 30,
        validate: {
            validator(value) {
                return validator.isEmail(value);
            },
            message: "You must enter a valid email address"
        }
    },
    password: {
        type: String,
        required: true,
        select: false,
    }
})