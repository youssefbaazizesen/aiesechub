// controllers/EventController.js
const express = require("express");
const multer = require("multer");
const Event = require("../Events");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Adjust the destination folder as needed

// Create an event
async function createEvent(req, res) {
  try {
    const { category, title, link, content, description, startdate, owner } =
      req.body;
    const image = req.file.filename;
    const newEvent = new Event({
      category,
      image,
      title,
      link,
      content,
      description,
      owner,
      read_time: new Date(),
      startdate,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get all events
async function getAllEvents(req, res) {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get a specific event by ID
async function getEventById(req, res) {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update a specific event by ID
async function updateEventById(req, res) {
  const update = {};
  for (const key of Object.keys(req.body)) {
    if (req.body[key] !== "") {
      update[key] = req.body[key];
    }
  }
  update["read_time"] = new Date();
  if (req.file != null) update["image"] = req.file.filename;
  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    { $set: update },
    { new: true }
  );

  if (!updatedEvent) {
    return res.status(404).json({ error: "Event not found" });
  }

  res.status(200).json(updatedEvent);
}

// Delete a specific event by ID
async function deleteEventById(req, res) {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(deletedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
};
