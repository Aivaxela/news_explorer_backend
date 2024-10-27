const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateId = (value, helpers) => {
  if (validator.isHexadecimal(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateNewArticle = celebrate({
  body: Joi.object().keys({
    urlToImage: Joi.string()
      .optional()
      .allow(null)
      .custom(validateURL)
      .messages({
        "string.uri": 'the "urlToImage" field must be a valid url',
      }),
    title: Joi.string().required().messages({
      "string.empty": 'The "title" field must be filled in',
    }),
    description: Joi.string().required().messages({
      "string.empty": 'The "description" field must be filled in',
    }),
    source: Joi.string().required().messages({
      "string.empty": 'The "source" field must be filled in',
    }),
    publishedAt: Joi.string().required().messages({
      "string.empty": 'The "publishedAt" field must be filled in',
    }),
    url: Joi.string().custom(validateURL).messages({
      "string.empty": 'The "url" field must be filled in',
      "string.uri": 'the "url" field must be a valid url',
    }),
    keyword: Joi.string().required().messages({
      "string.empty": 'The "keyword" field must be filled in',
    }),
  }),
});

module.exports.validateNewUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "email" field must be filled in',
      "string.uri": 'the "email" field must be a valid email',
    }),

    password: Joi.string()
      .required()
      .min(8)
      .max(64)
      .regex(
        new RegExp(
          `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$`
        )
      )
      .messages({
        "string.min": 'The minimum length of the "password" field is 8',
        "string.max": 'The maximum length of the "password" field is 64',
        "string.empty": 'The "password" field must be filled in',
      }),

    avatar: Joi.string().allow("").custom(validateURL).messages({
      "string.uri": 'the "avatar" field must be a valid url',
    }),
  }),
});

module.exports.validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "email" field must be filled in',
      "string.uri": 'the "email" field must be a valid email',
    }),

    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom(validateId).messages({
      "string.uri": "IDs must be a hexadecimal value length of 24 characters",
    }),
  }),
});
