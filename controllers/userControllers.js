const user = require("../models/users.js");

const usersControllers = {
  showRegisterForm(req, res) {
    res.render("signup.ejs");
  },

  async registerUser(req, res, next) {
    try {
      const { newUser, password } = req.body;
      const new_user = await user.register(new user(newUser), password);
      req.login(new_user, (err) => {
        if (err) {
          return next();
        }
        req.flash("success", "Welecome To Adventure Express.....");
        res.redirect(`/listings`);
      });
    } catch (error) {
      req.flash("error", error.message);
      return res.redirect(`/signup`);
    }
  },

  showLoginForm(req, res) {
    res.render("login.ejs");
  },

  async loginUser(req, res) {
    req.flash("success", "Welcome back to Adventure Express....");
    res.locals.redirectUrl = res.locals.redirectUrl || `/listings`;
    res.redirect(res.locals.redirectUrl);
  },

  async logoutUser(req, res, next) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You logout Successfuly.....");
      res.redirect(`/listings`);
    });
  },
};

module.exports = usersControllers;
