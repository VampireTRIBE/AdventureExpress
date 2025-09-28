// init_db.js
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const User = require("../models/users.js");
const Review = require("../models/reviews.js");
const init_data = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/AdventureExpress";

async function database_connect() {
  await mongoose.connect(MONGO_URL);
  console.log("✅ DataBase Connection Successful");
}

const initDB = async () => {
  try {
    // Clear old data
    await Listing.deleteMany({});
    await User.deleteMany({});
    await Review.deleteMany({});
    console.log("🗑️ Old data deleted");

    // Dummy users
    const dummyUser1 = new User({
      firstName: "Dummy",
      lastName: "User",
      email: "dummyexample@gmail.com",
      username: "dummyuser",
    });

    const dummyUser2 = new User({
      firstName: "Power",
      lastName: "Ranger",
      email: "powerRanger@gmail.com",
      username: "powerRanger",
    });

    const dummyUser3 = new User({
      firstName: "Jungle",
      lastName: "Fury",
      email: "jungleFury@gmail.com",
      username: "jungleFury",
    });

    const registeredUser1 = await User.register(dummyUser1, "12345");
    const registeredUser2 = await User.register(dummyUser2, "12345");
    const registeredUser3 = await User.register(dummyUser3, "12345");

    const dummyUsers = [registeredUser1, registeredUser2, registeredUser3];

    // Insert listings with random owners
    for (let listingData of init_data.data) {
      const randomUser =
        dummyUsers[Math.floor(Math.random() * dummyUsers.length)];

      const listing = new Listing({
        ...listingData,
        owner: randomUser._id,
        reviews: [],
      });

      // Optional: add 0–2 random reviews
      const sampleReviews = [
        { comment: "Amazing place!", rating: 5 },
        { comment: "Very cozy and comfortable.", rating: 4 },
        { comment: "Good location but noisy.", rating: 3 },
      ];

      const reviewsToAdd = sampleReviews
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3));

      for (let reviewData of reviewsToAdd) {
        const randomAuthor =
          dummyUsers[Math.floor(Math.random() * dummyUsers.length)];
        const review = new Review({
          ...reviewData,
          author: randomAuthor._id,
        });
        await review.save();
        listing.reviews.push(review._id);
      }

      await listing.save();
    }

    console.log("🌱 Database initialized with listings, owners & reviews!");
    mongoose.connection.close();
  } catch (error) {
    console.log("❌ Error initializing DB:", error);
    mongoose.connection.close();
  }
};

// Connect and run init
database_connect().then(initDB);
