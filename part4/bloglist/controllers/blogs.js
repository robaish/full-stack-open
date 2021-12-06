const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET BLOGS
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

// GET SINGLE BLOG
blogsRouter.get('/:id', (req, res, next) => {
  Blog
    .findById(req.params.id)
    .then(blog => {
      if (blog) {
        res.json(blog)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
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
  
  const savedBlog = await blog.save()
  res.json(savedBlog)
})

// DELETE BLOG
blogsRouter.delete('/:id', (req, res, next) => {
  Blog
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = blogsRouter