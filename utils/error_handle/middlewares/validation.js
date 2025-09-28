const SchemaValidation = require("../server_side/schema_validation.js");
const custom_error = require("../server_side/custom_error.js");
const listing = require("../../../models/listing.js");
const review = require("../../../models/reviews.js");
const mongoose = require("mongoose");

const validation = {
  formdata(req, res, next) {
    const { error } = SchemaValidation.listingJoiSchema.validate(req.body);
    if (error) {
      throw new custom_error(400, error.details[0].message);
    }
    next();
  },

  reviewdata(req, res, next) {
    const { error } = SchemaValidation.reviewJoiSchema.validate(req.body);
    if (error) {
      throw new custom_error(400, error.details[0].message);
    }
    next();
  },

  id_check(req, res, next) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new custom_error(404, "Invalid Listing ID");
    }
    next();
  },

  islogin(req, res, next) {
    if (!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl;
      req.flash("error", "Please Login First....");
      return res.redirect(`/login`);
    }
    next();
  },

  saveRedirectUrl(req, res, next) {
    if (req.session.redirectUrl) {
      res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
  },

  async isOwner(req, res, next) {
    const { id } = req.params;
    const listing_detail = await listing.findById(id);
    if (
      res.locals.curr_user &&
      !listing_detail.owner._id.equals(res.locals.curr_user._id)
    ) {
      req.flash("error", "Permission Denied.......");
      return res.redirect(`/listings/${id}`);
    }
    next();
  },

  async isAuthor(req, res, next) {
    const { id } = req.params;
    const { r_id } = req.params;
    const review_details = await review.findById(r_id);
    if (
      res.locals.curr_user &&
      !review_details.author._id.equals(res.locals.curr_user._id)
    ) {
      req.flash("error", "Permission Denied.......");
      return res.redirect(`/listings/${id}`);
    }
    next();
  },
};

module.exports = validation;
