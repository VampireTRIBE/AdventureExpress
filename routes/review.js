const express = require("express");
const router = express.Router({ mergeParams: true });

const reviewController = require("../controllers/reviewControllers.js");
const asyncWrap = require("../utils/error_handle/server_side/asyncwrap.js");
const validate_func = require("../utils/error_handle/middlewares/validation.js");

// routes

router.post(
  "/",
  validate_func.islogin,
  validate_func.reviewdata,
  validate_func.id_check,
  asyncWrap(reviewController.addReviewFrom)
);

router.delete(
  "/:r_id",
  validate_func.islogin,
  validate_func.isAuthor,
  validate_func.id_check,
  asyncWrap(reviewController.deleteReview)
);

module.exports = router;
