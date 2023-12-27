import express from "express";
import { addBlog, updateBlog, deleteBlog, getBlogById, listBlogs, searchBlogs } from '../controllers/blog.js';

const router = express.Router();


// Create a new blog
router.post('/add', addBlog);

// Get a blog by title
router.get('/:title', getBlogById);

// Get a list of all blogs
router.get('/', listBlogs);

// Update a blog by title
router.put('/:title', updateBlog);

// Delete a blog by title
router.delete('/:title', deleteBlog);

// Search blogs
router.get('/search', searchBlogs);

export default router;