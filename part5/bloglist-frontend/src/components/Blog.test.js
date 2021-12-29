import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url and likes by default', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 1
  }

  const component = render(
    <Blog blog={blog} />
  )

  const defaults = component.container.querySelector('.testing-blog-defaults')
  expect(defaults).not.toHaveStyle('display: none')

  const details = component.container.querySelector('.testing-blog-details')
  expect(details).toBe(null)

})