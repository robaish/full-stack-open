import React from 'react'
import Blog from './Blog'

const Bloglist = ({ blogs }) => (
  <div className="bloglist-container">
    <h3>All blog posts</h3>
    <div>
      {blogs.map(item =>
      <Blog key={item.id} blog={item} />)}
    </div>
  </div>
)

export default Bloglist