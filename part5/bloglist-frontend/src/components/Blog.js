import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const buttonLabel = showDetails ? 'Hide' : 'View'

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const like = (event) => {
    event.preventDefault()
    const addedLike = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    updateBlog(blog.id, addedLike)
  }

  const remove = event => {
    event.preventDefault()
    window.confirm(`Sure you want to delete ${blog.title}?`)
    removeBlog(blog.id)
  }

  return (
    <div className='blog-container'>
      <div className='flex flex-jc-sb'>
        {`${blog.title} – ${blog.author}`}
        <button onClick={toggleDetails}>{buttonLabel}</button>
      </div>
      {showDetails &&
        <div className='flex flex-vertical'>
          <span>{blog.url}</span>
          <span>Likes: {blog.likes} <button onClick={like}>Like</button></span>
          <span>Added by {blog.user.name}</span>
          {blog.user.username === user.username &&
          <button onClick={remove}>Remove</button>
          }
        </div>
      }
    </div>
  )
}

export default Blog