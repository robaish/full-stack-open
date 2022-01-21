import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

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

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(b => b.id === match.params.id)
    : null

  if (blog) {
    const blogUser = typeof blog.user === 'string'
      ? users.find(u => u.id === blog.user)
      : blog.user

  const comments = blog.comments.length > 0
    ? <ul>{blog.comments.map(
      item => <li key={item}>{item}</li>)}</ul>
    : <p>No comments yet.</p>

    return (
      <div>
        <h2>{blog.title}</h2>
        <div className='flex flex-vertical testing-blog-details'>
          <span>{blog.url}</span>
          <span id="likes">Likes: {blog.likes} <button id="like-button" onClick={like}>Like</button></span>
          <span>Added by {blogUser.name}</span>
          {blogUser.username === user.credentials.username &&
          <button id="remove-button" onClick={remove}>Remove</button>
          }
          <div>
            <h3>Comments</h3>
            {comments}
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default Blog