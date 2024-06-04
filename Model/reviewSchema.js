const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  rating: { type: Number },
  comment: { type: String },
  date: { type: Date, default: Date.now },
});
const review = mongoose.model("review", reviewSchema);
module.exports = review;
