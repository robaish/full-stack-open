const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// GET USERS
usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, author: 1, url: 1 })
  
  res.json(users)
})

// GET SINGLE USER
usersRouter.get('/:id', async (req, res) => {
  const user = await User
    .findById(req.params.id)
    .populate('blogs', { title: 1 })
  user ? res.json(user) : res.status(404).end()
})

// CREATE USER
usersRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.password) {
    return res.status(400).json({ error: 'password missing'})
  } else if (body.password.length < 3) {
    return res.status(400).json({ error: 'password must be at least 3 characters'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()
  res.json(savedUser)
})

module.exports = usersRouter