const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/userControllers.js");
const validate_func = require("../utils/error_handle/middlewares/validation.js");

// routes

router
  .route("/signup")
  .get(userController.showRegisterForm)
  .post(userController.registerUser);

router
  .route("/login")
  .get(userController.showLoginForm)
  .post(
    validate_func.saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.loginUser
  );

router.get("/logout", userController.logoutUser);

module.exports = router;
