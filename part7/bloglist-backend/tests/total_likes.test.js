const listHelper = require('../utils/list_helper')
const data = require('./test_data.json')

describe('total likes', () => {
  test('of one value is the value itself', () => {
    const blogs = data.slice(0,1)
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(12)
  })

  test('of many values are their sum', () => {
    const blogs = [...data]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(41)
  })

  test('of empty value is zero', () => {
    const blogs = [{}]
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })
})
