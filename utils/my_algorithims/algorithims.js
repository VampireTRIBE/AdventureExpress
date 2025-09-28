const my_algos = {
  avg_ratingAll(listings) {
    listings.forEach((el) => {
      let avgRating =
        el.reviews.length > 0
          ? Number(
              (
                el.reviews.reduce((acc, v) => acc + v.rating, 0) /
                el.reviews.length
              ).toFixed(2)
            )
          : "--";
      el["avgRating"] = avgRating;
    });
  },

  avg_ratingS(listing) {
    let avgRating =
      listing.reviews.length > 0
        ? Number(
            (
              listing.reviews.reduce((acc, v) => acc + v.rating, 0) /
              listing.reviews.length
            ).toFixed(2)
          )
        : "--";
    listing["avgRating"] = avgRating;
  },

  avg_ratingS(listing) {
    let avgRating =
      listing.reviews.length > 0
        ? Number(
            (
              listing.reviews.reduce((acc, v) => acc + v.rating, 0) /
              listing.reviews.length
            ).toFixed(2)
          )
        : "--";
    listing["avgRating"] = avgRating;
  },

  
};

module.exports = my_algos;
