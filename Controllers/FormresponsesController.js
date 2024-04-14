// controllers/FormresponsesController.js
const express = require("express");
const FormResponse = require("../FormResponses");

const router = express.Router();

// Create a FormResponse
async function createFormResponse(req, res) {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      selectBox,
      optionalField,
      fieldOf,
      questions,
      respType,
    } = req.body;
    const newFormResponse = new FormResponse({
      fullName,
      email,
      phoneNumber,
      selectBox,
      optionalField,
      fieldOf,
      questions,
      respType,
      resolved: "false",
    });

    const savednewFormResponse = await newFormResponse.save();
    res.status(201).json(savednewFormResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get all testimonials
async function getAllFormResponse(req, res) {
  try {
    const FormResponses = await FormResponse.find();
    res.status(200).json(FormResponses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a specific testimonial by ID
async function deleteFormResponseById(req, res) {
  try {
    const deletedFormResponse = await FormResponse.findByIdAndDelete(
      req.params.id
    );

    if (!deletedFormResponse) {
      return res.status(404).json({ error: "FormResponse not found" });
    }

    res.status(200).json(deletedFormResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function resolveQuestion(req, res) {
  const { resolution } = req.body;
  let newResolution = resolution === "true" ? "true" : "false";
  const updatedResponse = await FormResponse.findByIdAndUpdate(
    req.params.id,
    { resolved: newResolution },
    { new: true }
  );

  if (!updatedResponse) {
    return res.status(404).json({ error: "Response not found" });
  }

  res.status(200).json(updatedResponse);
}

module.exports = {
  createFormResponse,
  getAllFormResponse,
  deleteFormResponseById,
  resolveQuestion,
};
