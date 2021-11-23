const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.every(item => item.hasOwnProperty('likes')) 
    ? blogs.reduce((prev, curr) => prev + curr.likes, 0)
    : 0
}

module.exports = {
  dummy,
  totalLikes
}