const { hasUncaughtExceptionCaptureCallback } = require('process')
const listHelper = require('../utils/list_helper')
const data = require('./test_data.json')

describe('the most liked blog', () => {
  
  test('of one blog is the blog itself', () => {
    const blogs = data.slice(0,1)
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[0])
  })

  test('of many blogs is the one with most likes (if equal likes then the first one)', () => {
    const blogs = [...data]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[0])
  })

  test('of empty value is)', () => {
    const blogs = [{}]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toBe(0)
  })

})