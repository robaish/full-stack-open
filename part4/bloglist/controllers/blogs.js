const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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
blogsRouter.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findById(body.user)
  console.log('USER INFO:', user)
  
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
blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter