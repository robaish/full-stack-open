import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import BlogComments from './BlogComments'

const Blog = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
      navigate('/')
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

    return (
      <div className="mx-auto w-11/12 max-w-lg py-10 space-y-5 text-gr1 flex flex-col justify-center">
        <div className="mx-auto w-11/12 max-w-lg flex flex-col">
          <h2 className="text-3xl font-bold">{blog.title}</h2>
          <div className="mt-5 flex items-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            <a href={blog.url} className="ml-1 text-accent1">{blog.url}</a>
          </div>
          <div className="flex items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          <span id="likes" className="ml-1">{blog.likes} likes</span>
          </div>
          <div className="flex items-center">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          <span className="ml-1">Added by {blogUser.name}</span>
          </div>
          <div className="my-5 flex space-x-4">
            <button
              id="like-button"
              onClick={like}
              className="px-3 py-1 rounded-lg bg-accent1 text-sm font-semibold text-gr1"
            >Like
            </button>
            {blogUser.username === user.credentials.username &&
              <button
                id="remove-button"
                onClick={remove}
                className="px-3 py-1 rounded-lg bg-gr4 text-sm font-semibold text-gr1"
              >
              Remove
              </button>
            }
          </div>
          <BlogComments blog={blog} />
        </div>
      </div>
    )
  }
  return null
}

export default Blog