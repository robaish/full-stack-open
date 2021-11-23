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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}