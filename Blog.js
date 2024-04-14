// Blog.js

const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  category: String,
  image: String,
  title: String,
  content: String,
  description: String,
  owner: String,
  read_time: { type: Number, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
