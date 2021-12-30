const config = require('./utils/config')
const express = require('express')
require('express-async-errors') // eliminates try-catch
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


// MONGO
logger.info('CONNECTING to', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
		logger.info('CONNECTED to MongoDB');
	})
	.catch((error) => {
		logger.error('ERROR connecting to MongoDB:', error.message);
	})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

// ROOT ADDRESS
app.get('/', (request, response) => {
	response.send('<h1>Blog list</h1>');
});

// ROUTER ONLY USED IN /API/BLOGS ROUTES
app.use('/api/blogs', blogsRouter)

// ROUTER ONLY USED IN /API/USERS ROUTES
app.use('/api/users', usersRouter)

// ROUTER ONLY USED IN /API/LOGIN ROUTES
app.use('/api/login', loginRouter)

// ROUTER FOR TESTING
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app