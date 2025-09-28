const listing = require("../models/listing.js");
const review = require("../models/reviews.js");

const reviewControllers = {
  async addReviewFrom(req, res) {
    const { id } = req.params;
    const newReview = new review({
      ...req.body.review,
      createdAt: new Date(),
      author: res.locals.curr_user._id,
    });
    await Promise.all([
      newReview.save(),
      listing.findByIdAndUpdate(
        id,
        { $push: { reviews: newReview._id } },
        { new: true, runValidators: true }
      ),
    ]);
    req.flash("success", "Review Added.....");
    res.redirect(`/listings/${id}`);
  },

  async deleteReview(req, res) {
    const { id, r_id } = req.params;

    await Promise.all([
      review.findByIdAndDelete(r_id),
      listing.findByIdAndUpdate(id, { $pull: { reviews: r_id } }),
    ]);

    req.flash("success", "Review Deleted.....");
    res.redirect(`/listings/${id}`);
  },
};

module.exports = reviewControllers;
