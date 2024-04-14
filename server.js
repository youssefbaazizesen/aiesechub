const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const imageController = require("./Controllers/Imagecontroller");
const FormresponsesController = require("./Controllers/FormresponsesController");
const blogController = require("./Controllers/BlogController");
const bodyParser = require("body-parser");
const verifyToken = require("./middleware/AuthMiddleware");
const userController = require("./Controllers/UserController");
const authController = require("./Controllers/AuthController");
const testimonialsController = require("./Controllers/TestimonialsController");
const eventController = require("./Controllers/EventController");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Frontend/est-landingpage/src/Assets/Images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://Youssef:M8Wl6rvu1Huhc78M@cluster0.uekln2c.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Middleware
app.use(express.json());
app.use(cors());

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to your Express.js application");
});
// Routes
// Refresh token route
app.post("/api/refresh-token", authController.refreshToken);
// Upload an image
app.post(
  "/api/images",
  upload.single("image"),
  verifyToken,
  imageController.uploadImage
);

// Get all images
app.get("/api/images", imageController.getAllImages);

// Get all images
app.delete("/api/images/:id", verifyToken, imageController.deleteImageById);

// Create a new blog post
app.post(
  "/api/blogs",
  upload.single("image"),
  verifyToken,
  blogController.createBlog
);

// Get all blog posts
app.get("/api/blogs", blogController.getAllBlogs);

// Get a specific blog post by ID
app.get("/api/blogs/:id", blogController.getBlogById);

// Update a specific blog post by ID

app.put(
  "/api/blogs/:id",
  upload.single("image"),
  verifyToken,
  blogController.updateBlogById
);

// Delete a specific blog post by ID
app.delete("/api/blogs/:id", verifyToken, blogController.deleteBlogById);

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Register a user
app.post("/api/register", userController.registerUser);

// Login and receive a JWT token
app.post("/api/login", authController.loginUser);

// Protected route (example)
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({ message: "Protected route access granted" });
});
// Create a new testimonial
app.post(
  "/api/testimonials",
  verifyToken,
  upload.single("image"),
  testimonialsController.createTestimonial
);

// Get all testimonials
app.get("/api/testimonials", testimonialsController.getAllTestimonials);

// Get a specific testimonial by ID
app.get("/api/testimonials/:id", testimonialsController.getTestimonialById);

// Update a specific testimonial by ID
app.put(
  "/api/testimonials/:id",
  upload.single("image"),
  testimonialsController.updateTestimonialById
);

// Delete a specific testimonial by ID
app.delete(
  "/api/testimonials/:id",
  verifyToken,
  testimonialsController.deleteTestimonialById
);

//Get all FormResponses
app.get("/api/formresponse", FormresponsesController.getAllFormResponse);

//create a new FormResponse
app.post(
  "/api/formresponse",
  upload.any(),
  FormresponsesController.createFormResponse
);

//Get all FormResponses
app.delete(
  "/api/formresponse",
  verifyToken,
  FormresponsesController.deleteFormResponseById
);

//Change question resolution
app.put(
  "/api/formresponse/:id",
  upload.any(),
  verifyToken,
  FormresponsesController.resolveQuestion
);

// Create a new event
app.post("/api/events", upload.single("image"), eventController.createEvent);

// Get all events
app.get("/api/events", eventController.getAllEvents);

// Get a specific event by ID
app.get("/api/events/:id", eventController.getEventById);

// Update a specific event by ID
app.put(
  "/api/events/:id",
  upload.single("image"),
  eventController.updateEventById
);

// Delete a specific event by ID
app.delete("/api/events/:id", eventController.deleteEventById);


// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
