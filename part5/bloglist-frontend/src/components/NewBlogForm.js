import React, { useState } from 'react'

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
    <form className="new-blog-form-container" onSubmit={createBlog}>
      <h3>Add a new blog post</h3>
      <div>
        title:
        <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={updateField}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={newBlog.author}
          name="author"
          onChange={updateField}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={newBlog.url}
          name="url"
          onChange={updateField}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  )
}

export default NewBlogForm