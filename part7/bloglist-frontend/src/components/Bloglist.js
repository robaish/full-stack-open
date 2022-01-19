import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const Bloglist = ({ user }) => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div className="bloglist-container">
      <h3>All blog posts</h3>
      <div>
        {blogs
          .sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
          .map(item => <Blog
            key={item.id}
            blog={item}
            user={user} />
          )}
      </div>
    </div>
  )
}

export default Bloglist