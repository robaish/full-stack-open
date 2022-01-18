import React, { useState } from 'react'

const Blog = ({ blog, like, remove, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const buttonLabel = showDetails ? 'Hide' : 'View'

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const likeBlog = event => {
    event.preventDefault()
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    like(likedBlog)
  }

  const removeBlog = event => {
    event.preventDefault()
    if (window.confirm(`Sure you want to delete ${blog.title}?`)) {
      remove(blog)
    }
  }

  return (
    <div className='blog-container'>
      <div className='flex flex-jc-sb testing-blog-defaults'>
        {`${blog.title} – ${blog.author}`}
        <button id="blog-details-button" onClick={toggleDetails}>{buttonLabel}</button>
      </div>
      {showDetails &&
        <div className='flex flex-vertical testing-blog-details'>
          <span>{blog.url}</span>
          <span id="likes">Likes: {blog.likes} <button id="like-button" onClick={likeBlog}>Like</button></span>
          <span>Added by {user.name}</span>
          {blog.user.username === user.username &&
          <button id="remove-button" onClick={removeBlog}>Remove</button>
          }
        </div>
      }
    </div>
  )
}

export default Blog