const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Book = require('./models/book')
const Author = require('./models/author')

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
    name: String
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author!]!
  }

  type Mutation {
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
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // if (author === '' && genre !== '') {
      //   return books.filter(b => b.genres.includes(genre))
      // }
      // if (author !== '' && genre === '') {
      //   return books.filter(b => b.author === author)
      // }
      // if (author !== '' && genre !== '') {
      //   return books.filter(b => b.author === author && b.genres.includes(genre))
      // }
      const books = await Book.find({})
      return books
    },
    allAuthors: async (root, args) => {
      const authors = await Author.find({})
      return authors
    }
  },
  Author: {
    bookCount: root => {
      const authorBooks = books.filter(b => b.author === root.name)
      return authorBooks.length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({...args})
      const author = await Author.findOne({ name: args.author})
      
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
      const author = new Author({...args})
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (author) {
        const updatedAuthor = { ...author, born: args.setBornTo }
        authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
        return updatedAuthor
      }
      return null
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})