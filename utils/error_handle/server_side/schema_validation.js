const Joi = require("joi");

const listingJoiSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().max(100).required().messages({
      "string.empty": "Title is required",
      "string.max": "Title cannot exceed 100 characters",
    }),

    description: Joi.string().max(500).required().messages({
      "string.empty": "Description is required",
      "string.max": "Description cannot exceed 500 characters",
    }),

    image: Joi.object({
      filename: Joi.string()
        .required()
        .messages({ "string.empty": "Image filename is required" }),
      url: Joi.string().uri().required().messages({
        "string.empty": "Image URL is required",
        "string.uri": "Image URL must be a valid URL",
      }),
    }).required(),

    price: Joi.number().min(100).required().messages({
      "number.base": "Price must be a number",
      "number.min": "Price cannot be less than 100",
      "any.required": "Price is required",
    }),

    location: Joi.string().max(50).required().messages({
      "string.empty": "Location is required",
      "string.max": "Location cannot exceed 50 characters",
    }),

    country: Joi.string().max(50).required().messages({
      "string.empty": "Country is required",
      "string.max": "Country cannot exceed 50 characters",
    }),
  }).required(),
});

const reviewJoiSchema = Joi.object({
  review: Joi.object({
    comment: Joi.string().max(100).required().messages({
      "string.empty": "Review is required",
      "string.max": "Review cannot exceed 100 characters",
    }),

    rating: Joi.number().min(1).max(5).required().messages({
      "number.base": "Rating must be a Number",
      "number.min": "Rating cannot be less than 1",
      "number.max": "Rating cannot be greater than 5",
      "any.required": "Rating is required",
    }),
  }).required(),
});

module.exports = { listingJoiSchema, reviewJoiSchema };
