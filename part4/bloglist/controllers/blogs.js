const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  const blog = new Blog(req.body);
  const user = await User.findById(req.user.id);

  blog.user = user._id;

  if (!blog.title && !blog.url) {
    return res.status(400).send({ error: 'title or url missing' });
  } else {
    blog.likes = blog.likes ? blog.likes : 0;
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
  }
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId);
  const user = await User.findById(req.user.id);

  if (blog.user.toString() === req.user.id) {
    await Blog.findByIdAndRemove(blogId);

    user.blogs = user.blogs.filter(u => u.toString() !== blogId)
    await user.save();

    res.status(204).end();
  } else {
    return res.status(401).json({ error: 'blog can only be deleted by its creator' });
  }
})

blogsRouter.put('/:id', userExtractor, async (req, res) => {
  const blog = req.body;

  if (!blog.title && !blog.url) {
    res.status(400).send({ error: 'title or url missing' });
  } else {
    const result = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
    res.json(result);
  }
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const { id } = req.params
  const { comment } = req.body;
  const blog = await Blog.findById(id)

  blog.comments.push(comment)

  if (!comment) {
    return res.status(400).send({ error: 'comment is missing' });
  }

  const result = await Blog.findByIdAndUpdate(id, blog, { new: true })
  res.status(200).json(result)
})

module.exports = blogsRouter;