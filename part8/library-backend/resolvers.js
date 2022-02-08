const { UserInputError, AuthenticationError } = require('apollo-server')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'JUST_A_SECRET_KEY'

const resolvers = {
  Query: {
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
      const authors = await Author.find({}).populate('books')
      return authors.map(author => {
        return {
          ...author,
          name: author.name,
          born: author.born,
          bookCount: author.books.length 
        }
      })
    },
    me: (root, args, context) => {
      return context.currentUser
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

      let author = await Author.findOne({ name: args.author })
  
      if (!author) {
        try {
          author = new Author({ name: args.author })
          await author.save()
        }
        catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const book = new Book({ ...args, author: author })

      try {
        const savedBook = await book.save()
        author.books = author.books.concat(savedBook)
        await author.save()
      } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

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
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers