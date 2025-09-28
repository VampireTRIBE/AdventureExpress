const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review = require("./reviews");

const listingSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    maxlength: [500, "Description cannot exceed 500 characters"],
  },
  image: {
    filename: {
      type: String,
      required: [true, "Image filename is required"],
    },
    url: {
      type: String,
      required: [true, "Image URL is required"],
    },
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be less than 0"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    maxlength: [50, "Location cannot exceed 50 characters"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
    maxlength: [50, "Country cannot exceed 50 characters"],
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "reviews",
    },
  ], 
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
