import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { notifySuccess, notifyError } from '../reducers/notificationReducer'
import Blog from './Blog'

const Bloglist = ({ user }) => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const remove = blog => {
    try {
      dispatch(removeBlog(blog.id))
      dispatch(notifySuccess('Blog post deleted'))
    } catch(e) {
      dispatch(notifyError(`${e.response.data.error}`))
    }
  }

  const like = likedBlog => {
    try {
      dispatch(likeBlog(likedBlog))
      dispatch(notifySuccess(`Like added: ${likedBlog.title} by ${likedBlog.author}`))
    } catch(e) {
      dispatch(notifyError(`${e.response.data.error}`))
    }
  }

  return (
    <div className="bloglist-container">
      <h3>All blog posts</h3>
      <div>
        {blogs
          .sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
          .map(item => <Blog
            key={item.id}
            blog={item}
            remove={remove}
            like={like}
            user={user} />
          )}
      </div>
    </div>
  )
}

export default Bloglist