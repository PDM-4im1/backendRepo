import Blog from "../models/blog.js";

// Ajouter un nouveau blog
export async function addBlog(req, res) {
  const { title, content, author, datePublished } = req.body;

  try {
    const newBlog = new Blog({
      title,
      content,
      author,
      datePublished,
    });

    await newBlog.save();

    res.status(201).json(newBlog);
  } catch (err) {
    console.error('error occured during add', err);
    res.status(500).json({ error: err.message });
  }
}

// Modifier un blog existant par titre
export async function updateBlog(req, res) {
  const { title } = req.params;

  try {
    const blog = await Blog.findOneAndUpdate({ title }, req.body, { new: true });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Supprimer un blog existant par titre
export async function deleteBlog(req, res) {
  const { title } = req.params;

  try {
    const deletedBlog = await Blog.findOneAndDelete({ title });

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Afficher un blog par titre
export async function getBlogById(req, res) {
  const { title } = req.params;

  try {
    const blog = await Blog.findOne({ title });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Liste des blogs
export async function listBlogs(req, res) {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Rechercher des blogs
export async function searchBlogs(req, res) {
  const query = req.query.q;

  try {
    const blogs = await Blog.find({
      title: { $regex: new RegExp(query, "i") },
    });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
