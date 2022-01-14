import React from 'react'
import Blog from './Blog'

const Bloglist = ({ blogs, updateBlog, removeBlog, user }) => {

  return (
    <div className="bloglist-container">
      <h3>All blog posts</h3>
      <div>
        {blogs
          .sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
          .map(item => <Blog
            key={item.id}
            blog={item}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            user={user} />
          )}
      </div>
    </div>
  )
}

export default Bloglist