import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = ({ user }) => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div className="bloglist-container">
      <h3>All blog posts</h3>
      <div>
        {blogs
          .sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
          .map(blog =>
            <div className="blog-container" key={blog.id} user={user}>
              <Link to={`/blogs/${blog.id}`}>
                <span>{blog.title} – </span>
                <span>{blog.author}</span>
              </Link>
            </div>
          )}
      </div>
    </div>
  )
}

export default BlogList