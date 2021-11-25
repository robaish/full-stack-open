const listHelper = require('../utils/list_helper')
const data = require('./test_data.json')

describe('the author with most likes', () => {
  test('of one value is the value itself', () => {
    const blogs = data.slice(0,1)
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: "Michael Chan",
      likes: 12
    })
  })

  test('of many values', () => {
    const blogs = [...data]
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })

  test('of empty value is zero', () => {
    const blogs = [{}]
    const result = listHelper.mostLikes(blogs)
    expect(result).toBe(0)
  })

})
