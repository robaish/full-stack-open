var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs
    .filter(item => item.hasOwnProperty('likes')) 
    .reduce((prev, curr) => prev + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs
    .filter(item => item.hasOwnProperty('likes'))
    .reduce((prev, current) => (prev.likes >= current.likes) ? prev : current, 0)
}

const mostBlogs = (blogs) => {
  const authors = _(blogs).map('author').remove((item) => item !== undefined)
  const mostCommonAuthor = _.chain(authors).countBy().toPairs().max(_.last).value()

  return mostCommonAuthor
    ? _.fromPairs([['author', mostCommonAuthor[0]], ['blogs', mostCommonAuthor[1]]])
    : null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}