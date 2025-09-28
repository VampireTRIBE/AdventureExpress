const listing = require("../models/listing.js");
const my_algos = require("../utils/my_algorithims/algorithims.js");

const listingControllers = {
  async index_route(req, res) {
    const all_listings = await listing.find().populate("reviews", "rating");
    my_algos.avg_ratingAll(all_listings);
    res.render("all_listings.ejs", { all_listings });
  },

  async newListinForm(req, res) {
    res.render("new_listing.ejs");
  },

  async newListinAdd(req, res) {
    const new_listing = new listing({
      ...req.body.listing,
      owner: req.user._id,
    });
    await new_listing.save();
    req.flash("success", "Listing Added.....");
    res.redirect(`/listings`);
  },

  async listingShow(req, res) {
    const { id } = req.params;
    const list = await listing
      .findById(id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("owner");

    if (!list) {
      req.flash("error", "Listing Not Found.....");
      return res.redirect(`/listings`);
    }
    my_algos.avg_ratingS(list);
    res.render("show_listing.ejs", { list });
  },

  async listingUpdateFrom(req, res) {
    const { id } = req.params;
    const listing_edit = await listing.findById(id);
    if (!listing_edit) {
      req.flash("error", "Listing Not Found.....");
      return res.redirect(`/listings`);
    }
    res.render("edit.ejs", { listing_edit });
  },

  async listingUpdate(req, res) {
    const { id } = req.params;
    if (
      !(await listing.findByIdAndUpdate(
        id,
        { ...req.body.listing },
        { runValidators: true }
      ))
    ) {
      req.flash("error", "Listing Not Found.....");
      return res.redirect(`/listings`);
    }

    req.flash("success", "Listing Updated.....");
    res.redirect(`/listings/${id}`);
  },

  async listingDelete(req, res) {
    const { id } = req.params;
    if (!(await listing.findByIdAndDelete(id))) {
      req.flash("error", "Listing Not Found.....");
      return res.redirect(`/listings`);
    }
    req.flash("success", "Listing Deleted.....");
    res.redirect(`/listings`);
  },
};

module.exports = listingControllers;
