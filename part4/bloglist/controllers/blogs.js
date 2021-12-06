const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET BLOGS
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

// GET SINGLE BLOG
blogsRouter.get('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)
  blog ? res.json(blog) : res.status(404).end()
})

// ADD BLOG
blogsRouter.post('/', async (req, res, next) => {
  const body = req.body
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  if (blog.likes === undefined) {
    blog.likes = 0
  }
  
  const savedBlog = await blog.save()
  res.json(savedBlog)
})

// DELETE BLOG
blogsRouter.delete('/:id', async (req, res, next) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter