const { types, ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  comment: {
    type: String,
    required: true,
    maxlength: 100,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAT: {
    type: Date,
    required: true,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
  }, 
});

const reviews = mongoose.model("reviews", reviewSchema);
module.exports = reviews;
