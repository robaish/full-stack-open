const { ApolloServer } = require('apollo-server')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongoose = require('mongoose')
const config = require('./utils/config')
const jwt = require('jsonwebtoken')
const User = require('./models/user')

const JWT_SECRET = 'JUST_A_SECRET_KEY'

console.log('%c connecting to MongoDB', 'color: orange;')

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('%c connected to MongoDB', 'color: green;')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`)
  console.log(`✅ Subscriptions ready at ${subscriptionsUrl}`)
})