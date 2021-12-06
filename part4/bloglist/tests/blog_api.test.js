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

// GET ALL
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

// SINGLE BLOG POST
describe('A single blog post:', () => {
  test('with a valid id can be viewed', async () => {
    const blogsBefore = await helper.blogsInDb()
    const chosenBlog = blogsBefore[0]

    const resultBlog = await api
      .get(`/api/blogs/${chosenBlog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(resultBlog.body).toEqual(chosenBlog)
  })

  test('with nonexisting id fails with status code 404', async () => {
    const nonExistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${nonExistingId}`)
      .expect(404)
  })

  test('can be deleted', async () => {
    const blogsBefore = await helper.blogsInDb()
    const chosenBlog = blogsBefore[0]

    await api
      .delete(`/api/blogs/${chosenBlog.id}`)
      .expect(204)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length - 1)
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
    
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)

    const blogTitles = blogsAfter.map(blog => blog.title)
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

      const blogsAfter = await helper.blogsInDb()
      expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
      expect(blogsAfter[blogsAfter.length - 1]).toHaveProperty('likes', 0)
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