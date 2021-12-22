import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const buttonLabel = showDetails ? 'Hide' : 'View'

  const toggleDetails = () => {
    setShowDetails(!showDetails)
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
          <span>Likes: {blog.likes} <button>Like</button></span>
          <span>Added by {blog.user.name}</span>
        </div>
      }
    </div>
  )
}

export default Blog