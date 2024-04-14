// controllers/TestimonialController.js
const express = require("express");
const multer = require("multer");
const Testimonial = require("../Testimonial");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Adjust the destination folder as needed

// Create a testimonial
async function createTestimonial(req, res) {
  try {
    const { paragraph, name, program } = req.body;
    const picture = req.file.filename;

    const newTestimonial = new Testimonial({
      paragraph,
      name,
      picture,
      program,
    });

    const savedTestimonial = await newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get all testimonials
async function getAllTestimonials(req, res) {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json(testimonials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get a specific testimonial by ID
async function getTestimonialById(req, res) {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update a specific testimonial by ID
async function updateTestimonialById(req, res) {
  try {
    const update = {};
    for (const key of Object.keys(req.body)) {
      if (req.body[key] !== "") {
        update[key] = req.body[key];
      }
    }
    if (req.file != null) update["picture"] = req.file.filename;
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }

    res.status(200).json(updatedTestimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a specific testimonial by ID
async function deleteTestimonialById(req, res) {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(
      req.params.id
    );

    if (!deletedTestimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }

    res.status(200).json(deletedTestimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonialById,
  deleteTestimonialById,
};
