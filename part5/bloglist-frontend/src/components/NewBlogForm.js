import React, { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ blogs, setBlogs, setNotification }) => {
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

  const addBlog = async event => {
    event.preventDefault()
    try {
      await blogService.create(newBlog)
      setBlogs(blogs.concat(newBlog))
      setNotification({ state: 'success', message: `Blog post added: ${newBlog.title} by ${newBlog.author}` })
      setTimeout(() => setNotification({ state: null }), 5000)
      setNewBlog({
        title: '',
        author: '',
        url: ''
      })
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <form className="new-blog-form-container" onSubmit={addBlog}>
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