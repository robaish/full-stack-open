const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const config = require('./utils/config')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const Book = require('./models/book')
const Author = require('./models/author')

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

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token

    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book

    addAuthor(
      name: String!
      born: Int
    ): Author

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, { author = '', genre = ''}) => {
      if (author === '' && genre !== '') {
        const books = await Book
          .find({ genres: { $in: [ genre ] } })
          .populate('author')
        return books
      }
      if (author !== '' && genre === '') {
        const authorObj = await Author.findOne({ name: author })
        const books = await Book
          .find( { author: authorObj._id })
          .populate('author')
        return books
      }
      if (author !== '' && genre !== '') {
        const authorObj = await Author.findOne({ name: author })
        const books = await Book
          .find( { $and: [ { author: authorObj._id }, { genres: { $in: [ genre ] } } ] } )
          .populate('author')
        return books
      }
      const books = await Book.find({}).populate('author')
      return books
    },
    allAuthors: async (root, args) => {
      const authors = await Author.find({})
      return authors
    }
  },
  Author: {
    bookCount: async root => {
      const booksByAuthor = await Book.find( { author: root._id } )
      return booksByAuthor.length
    }
  },
  Mutation: {
    createUser: (root, args) => {
      const user = new User({ ...args })
      return user
        .save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      
      if (!user || args.password !== 'secret') {
        throw new UserInputError("Wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("You must be logged in to add a book.")
      }

      const book = new Book({ ...args })
      const author = await Author.findOne({ name: args.author })
      
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save()
        book.author = newAuthor
      } else {
        book.author = author
      }

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("You must be logged in to edit author details.")
      }

      const author = await Author.findOne({ name: args.name })
      if (author) {
        author.born = args.setBornTo
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return author
      }
      return null
    }
  }
}

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

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

// {
//   "username": "Rob Reader",
//   "password": "secret"
// }