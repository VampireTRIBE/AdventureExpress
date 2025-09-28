const express = require("express");
const router = express.Router();

const listingController = require("../controllers/listingControllers.js");
const asyncWrap = require("../utils/error_handle/server_side/asyncwrap.js");
const validate_func = require("../utils/error_handle/middlewares/validation.js");

// routes

router
  .route("/")
  .get(asyncWrap(listingController.index_route))
  .post(validate_func.formdata, asyncWrap(listingController.newListinAdd));

router.get(
  "/new",
  validate_func.islogin,
  asyncWrap(listingController.newListinForm)
);

router
  .route("/:id")
  .get(validate_func.id_check, asyncWrap(listingController.listingShow))
  .patch(
    validate_func.islogin,
    validate_func.isOwner,
    validate_func.formdata,
    validate_func.id_check,
    asyncWrap(listingController.listingUpdate)
  )
  .delete(
    validate_func.islogin,
    validate_func.isOwner,
    validate_func.id_check,
    asyncWrap(listingController.listingDelete)
  );

router.get(
  "/:id/edit",
  validate_func.id_check,
  validate_func.isOwner,
  validate_func.islogin,
  asyncWrap(listingController.listingUpdateFrom)
);

module.exports = router;
