import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const updateField = event => {
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value
    })
  }

  const createBlog = event => {
    event.preventDefault()
    addBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <form className="my-5" onSubmit={createBlog}>
      <label htmlFor="title" className="block text-sm font-medium text-gr1">
        Title
      </label>
      <input
        type="text"
        id="title"
        value={newBlog.title}
        name="title"
        onChange={updateField}
        className="mt-1 block w-full max-w-md px-2 py-1 rounded-md shadow-sm"
      />
      <label htmlFor="author" className="mt-3 block text-sm font-medium text-gr1">
        Author
      </label>
      <input
        type="text"
        id="author"
        value={newBlog.author}
        name="author"
        onChange={updateField}
        className="mt-1 mb-3 block w-full max-w-md px-2 py-1 rounded-md shadow-sm"
      />
      <label htmlFor="url" className="mt-3 lock text-sm font-medium text-gr1">
        Website
      </label>
      <div className="mt-1 flex w-full max-w-md rounded-md shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gr3 text-sm">
          www.
        </span>
        <input
          type="text"
          id="url"
          value={newBlog.url}
          name="url"
          onChange={updateField}
          className="block w-full px-2 py-1 rounded-r-md border-l"
        />
      </div>
      <button
        id="add-blog-button"
        type="submit"
        className="mt-5 px-3 py-1 rounded-lg bg-accent1 text-sm font-semibold text-gr1 hover:bg-accent1b">
          Add
      </button>
    </form>
  )
}

NewBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default NewBlogForm