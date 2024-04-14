// imageController.js

const Image = require("../Image"); // Import the Image model

// Upload an image
async function uploadImage(req, res) {
  try {
    const filename = req.file.filename;
    const description = req.body.description;
    const image = new Image({ description, filename });
    await image.save();
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ error: "Image upload failed" });
  }
}

// Get all images
async function getAllImages(req, res) {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Error fetching images" });
  }
}

// Delete a specific event by ID
async function deleteImageById(req, res) {
  try {
    const deletedImage = await Image.findByIdAndDelete(req.params.id);

    if (!deletedImage) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.status(200).json(deletedImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  uploadImage,
  getAllImages,
  deleteImageById,
};
