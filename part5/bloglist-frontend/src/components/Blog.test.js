import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const likeBlog = jest.fn()

  beforeEach(() => {
    const user = {
      id:'123456789',
      username: 'willywonka',
      name: 'Willy Wonka'
    }

    const blog = {
      title: 'Test title',
      author: 'Test author',
      url: 'Test url',
      likes: 1,
      user: user
    }

    component = render(
      <Blog
        blog={blog}
        user={user}
        updateBlog={likeBlog}
      />
    )
  })

  test('renders title and author but not url and likes by default', () => {
    const defaults = component.container.querySelector('.testing-blog-defaults')
    expect(defaults).not.toHaveStyle('display: none')

    const details = component.container.querySelector('.testing-blog-details')
    expect(details).toBe(null)
  })

  test('url and likes shown when clicking button', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    const details = component.container.querySelector('.testing-blog-details')
    expect(details).not.toHaveStyle('display: none')
  })

  test('clicking like button twice calls event handler twice', () => {
    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })

})