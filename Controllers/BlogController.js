// blogController.js

const Blog = require("../Blog"); // Import the Blog model

// Create a new blog post
async function createBlog(req, res) {
  const image = req.file.filename;
  const { category, title, content, owner, description } = req.body;
  const blog = new Blog({
    category,
    image,
    title,
    content,
    owner,
    read_time: new Date(),
    description,
  });
  await blog.save();
  res.status(201).json(blog);
}

// Get all blog posts
async function getAllBlogs(req, res) {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
}

// Get a specific blog post by ID
async function getBlogById(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Error fetching blog" });
  }
}

// Update a specific blog post by ID
async function updateBlogById(req, res) {
  const update = {};
  for (const key of Object.keys(req.body)) {
    if (req.body[key] !== "") {
      update[key] = req.body[key];
    }
  }
  if (req.file != null) update["image"] = req.file.filename;
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { $set: update },
    { new: true }
  );
  if (!updatedBlog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  res.json(updatedBlog);
}

// Delete a specific blog post by ID
async function deleteBlogById(req, res) {
  try {
    const deletedBlog = await Blog.findByIdAndRemove(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json(deletedBlog);
  } catch (err) {
    res.status(500).json({ error: "Error deleting blog" });
  }
}

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
};
