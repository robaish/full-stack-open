const config = require('./utils/config')
const express = require('express')
require('express-async-errors') // eliminates try-catch
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
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

// ROOT ADDRESS
app.get('/', (request, response) => {
	response.send('<h1>Blog list</h1>');
});

// ROUTER USED IF URL IS /API/BLOGS/...
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app