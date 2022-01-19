import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [showDetails, setShowDetails] = useState(false)
  const buttonLabel = showDetails ? 'Hide' : 'View'

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const like = event => {
    event.preventDefault()
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(likeBlog(likedBlog))
  }

  const remove = event => {
    event.preventDefault()
    if (window.confirm(`Sure you want to delete ${blog.title}?`)) {
      dispatch(removeBlog(blog.id))
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
          <span id="likes">Likes: {blog.likes} <button id="like-button" onClick={like}>Like</button></span>
          <span>Added by {blog.user.name}</span>
          {blog.user.username === user.credentials.username &&
          <button id="remove-button" onClick={remove}>Remove</button>
          }
        </div>
      }
    </div>
  )
}

export default Blog