const { application } = require('express')
const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs, blogsInDb
}