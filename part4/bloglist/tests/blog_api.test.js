const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

// FOR TESTS REQUIRING LOGIN
const user = {
  "username": "root",
  "password": "salainen",
  "token": ""
}

// INITIALIZE DB
beforeEach(async () => {
  // log in user before tests
  const loggedInUser = await api
      .post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
  user.token = loggedInUser.body.token

  await Blog.deleteMany({}) // clear db
  const blogObjs = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjs.map(blog => blog.save())
  await Promise.all(promiseArray)
})

// GET ALL BLOG POSTS
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

// A SINGLE BLOG POST
describe('A single blog post:', () => {
  // test getting
  test('with a valid id can be viewed', async () => {
    const blogsBefore = await helper.blogsInDb()
    const blogToDelete = blogsBefore[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToDelete.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(resultBlog.body).toEqual(blogToDelete)
  })

  test('with nonexisting id fails with status code 404', async () => {
    const nonExistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${nonExistingId}`)
      .expect(404)
  })
  // test deletion
  test('can be deleted', async () => {
    // add blog, then delete
    const newBlog = {
      "title": "Soon Deleted",
      "author": "Yet Another Author",
      "url": "https://yetanother.blog/",
      "likes": 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + user.token)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsBefore = await helper.blogsInDb()
    const blogToDelete = blogsBefore[blogsBefore.length - 1]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'bearer ' + user.token)
      .expect(204)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
  })
  // test updating
  test('can be updated', async () => {
    const blogsBefore = await helper.blogsInDb()
    const blogToUpdate = blogsBefore[0]
    blogToUpdate.likes += 1000

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

// POSTING NEW BLOG POSTS
describe('When posting blogs to database:', () => {
  test('a valid blog post is added', async () => {
    
    const newBlog = {
      "title": "Yet Another Blog",
      "author": "Yet Another Author",
      "url": "https://yetanother.blog/",
      "likes": 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + user.token)
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
      .set('Authorization', 'bearer ' + user.token)
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
      .set('Authorization', 'bearer ' + user.token)
      .expect(400)
  })

  test('posting a blog without token results in 401', async () => {
    const newBlog = {
      "title": "Yet Another Blog",
      "author": "Yet Another Author",
      "url": "https://yetanother.blog/",
      "likes": 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})