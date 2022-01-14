const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:', req.path)
  logger.info('Body:', req.body)
  logger.info('---')
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  
  req.token = authorization && authorization.toLowerCase().startsWith('bearer ')
    ? authorization.substring(7)
    : null

  next()
}

const userExtractor = async (req, res, next) => {
  // check validity and decode token:
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid '} )
  }
  // get user and assign to request object
  req.user = await User.findById(decodedToken.id)

  next()
}

const unknownEndPoint = (req, res) => {
  res.status(404).send( { error: 'unknown endpoint :('})
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'wrongly formatted id'} )
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  }

  logger.error(error.message)
  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndPoint,
  errorHandler
}