const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  test('of one value is the value itself', () => {
    const blogs = [{likes: 10}]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(10)
  })

  test('of many values are their sum', () => {
    const blogs = [{likes: 1}, {likes: 2}, {likes: 3}]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(6)
  })

  test('of empty value is zero', () => {
    const blogs = [{}]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })
})
