const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


describe('🌈 When getting notes from database:', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('there is one blog', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(1)
  })

  test('unique identifier is named id, not _id', async () => {
    const response = await api.get('/api/blogs')
    const blogObj = response.body[0]
    expect(blogObj.id).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})