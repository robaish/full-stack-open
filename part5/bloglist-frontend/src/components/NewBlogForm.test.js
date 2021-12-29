import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

describe('<NewBlogForm />', () => {
  const addBlog = jest.fn()

  test('Event handler called correctly when creating new blog', () => {
    const component = render(
      <NewBlogForm addBlog={addBlog}/>
    )

    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
      target: { value: 'Love is all you need' }
    })
    fireEvent.change(authorInput, {
      target: { value: 'John Lennon' }
    })
    fireEvent.change(urlInput, {
      target: { value: 'johnlennon.org' }
    })
    fireEvent.submit(form)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('Love is all you need')
    expect(addBlog.mock.calls[0][0].author).toBe('John Lennon')
    expect(addBlog.mock.calls[0][0].url).toBe('johnlennon.org')

  })
})