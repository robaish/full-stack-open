const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

// GET BLOGS
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  
  res.json(blogs)
})

// GET SINGLE BLOG
blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  blog ? res.json(blog) : res.status(404).end()
})

// ADD BLOG
blogsRouter.post('/', userExtractor, async (req, res) => {
  const body = req.body
  const user = req.user
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if (blog.likes === undefined) {
    blog.likes = 0
  }
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.json(savedBlog)
})

// UPDATE BLOG
blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  
  const updatedInfo = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updatedInfo)
  res.json(updatedBlog)
})

// DELETE BLOG
blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const body = req.body
  const user = req.user
  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } else {
    return res.status(401).json({ error: `cannot delete another user's blog` })
  }
  
})

module.exports = blogsRouter