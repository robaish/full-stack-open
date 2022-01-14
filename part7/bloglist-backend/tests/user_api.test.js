const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

describe('When initially one user in database:', () => {
  beforeEach(async () => {
    await User.deleteMany({}) // clear db
  
    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({ username: 'root', passwordHash})
  
    await user.save()
  })

  test('a valid new user can be created', async () => {
    const usersBefore = await helper.usersInDb()

    const validNewUser = {
      "username": "coolcat",
      "name": "Cool Cat",
      "password": "salainen"
    }

    await api
      .post('/api/users')
      .send(validNewUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length + 1)
  })

  test('a user with too short username cannot be created', async () => {
    const tooShortUsername = {
      "username": "12",
      "name": "should fail",
      "password": "salainen"
    }

    const result = await api
      .post('/api/users')
      .send(tooShortUsername)
      .expect(400)
    
    expect(result.body.error).toContain('Username must be at least 3 characters')
  })

  test('a user with existing username cannot be created', async () => {
    const notUnique = {
      "username": "root",
      "name": "Superuser",
      "password": "salainen"
    }

    const result = await api
      .post('/api/users')
      .send(notUnique)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

  })

  test('a user with missing password cannot be created', async () => {
    const missingPassword = {
      "username": "shouldfail",
      "name": "should fail",
    }

    const result = await api
      .post('/api/users')
      .send(missingPassword)
      .expect(400)
    
    expect(result.body.error).toContain('password missing')
  })

  test('a user with too short password cannot be created', async () => {
    const tooShortPassword = {
      "username": "shouldfail",
      "name": "should fail",
      "password": "12"
    }

    const result = await api
      .post('/api/users')
      .send(tooShortPassword)
      .expect(400)
    
    expect(result.body.error).toContain('password must be at least 3 characters')
  })
})

afterAll(() => {
  mongoose.connection.close()
})