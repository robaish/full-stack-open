const listHelper = require('../utils/list_helper')
const data = require('./test_data.json')

describe('the author with most blogs', () => {
  test('of one value is the value itself', () => {
    const blogs = data.slice(0,1)
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: "Michael Chan",
      blogs: 1
    })
  })

  test('of many values is the most frequent author', () => {
    const blogs = [...data]
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })

  test('of empty value is null', () => {
    const blogs = [{}]
    const result = listHelper.mostBlogs(blogs)
    expect(result).toBe(null)
  })
})
