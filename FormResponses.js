// models/Testimonial.js
const mongoose = require("mongoose");

const formResponseSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  selectBox: {
    type: String,
    required: true,
  },
  optionalField: {
    type: String,
    required: true,
  },
  fieldOf: {
    type: String,
    required: true,
  },
  questions: {
    type: String,
    required: true,
  },
  respType: {
    type: String,
    required: true,
  },
  resolved: {
    type: String,
    required: true,
  },
});

const FormResponse = mongoose.model("FormResponse", formResponseSchema);

module.exports = FormResponse;
