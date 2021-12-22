import React from 'react'
import Blog from './Blog'

const Bloglist = ({ blogs, updateBlog }) => (
  <div className="bloglist-container">
    <h3>All blog posts</h3>
    <div>
      {blogs
        .sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
        .map(item =>
          <Blog key={item.id} blog={item} updateBlog={updateBlog} />
          )
      }
    </div>
  </div>
)

export default Bloglist