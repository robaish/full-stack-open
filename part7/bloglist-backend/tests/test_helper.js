const { application } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    "title": "Some Blog",
    "author": "Some Author",
    "url": "https://some.blog/",
    "likes": 1
  },
  {
    "title": "Another Blog",
    "author": "Another Author",
    "url": "https://another.blog/",
    "likes": 2
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({
    "title": "Will Be",
    "author": "Deleted Soon",
    "url": "https://another.blog/",
    "likes": 1
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, 
  blogsInDb,
  nonExistingId,
  usersInDb
}