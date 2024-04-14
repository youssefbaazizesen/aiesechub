// models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  read_time: {
    type: Number,
    required: true,
    default: Date.now,
  },
  startdate: {
    type: Date,
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
