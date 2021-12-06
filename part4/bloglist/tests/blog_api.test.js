const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

// INITIALIZE DB
beforeEach(async () => {
  await Blog.deleteMany({}) // clear db
  const blogObjs = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjs.map(blog => blog.save())
  await Promise.all(promiseArray)
})

// GET
describe('When getting blogs from database:', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier is named id, not _id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.every(blog => blog.id)).toBeTruthy()
  })
})

// POST
describe('When posting blogs to database:', () => {
  test('a valid note is added', async () => {
    const newBlog = {
      "title": "Yet Another Blog",
      "author": "Yet Another Author",
      "url": "https://yetanother.blog/",
      "likes": 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const blogsInTheEnd = await helper.blogsInDb()
    expect(blogsInTheEnd).toHaveLength(helper.initialBlogs.length + 1)

    const blogTitles = blogsInTheEnd.map(blog => blog.title)
    expect(blogTitles).toContain(newBlog.title)
  })

  test('missing likes property defaults to 0', async () => {
    const newBlog = {
      "title": "Yet Another Blog",
      "author": "Yet Another Author",
      "url": "https://yetanother.blog/"
    }

    if (newBlog.likes === undefined) {
      newBlog.likes = 0
    }
      
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

      const blogsInTheEnd = await helper.blogsInDb()
      expect(blogsInTheEnd).toHaveLength(helper.initialBlogs.length + 1)
      expect(blogsInTheEnd[blogsInTheEnd.length - 1]).toHaveProperty('likes', 0)
  })

  test('missing title/url results in 400 bad request', async () => {
    const newBlog = {
      "title": "Yet Another Blog",
      "author": "Yet Another Author"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})