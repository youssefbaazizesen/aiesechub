// models/Testimonial.js
const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  paragraph: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;
