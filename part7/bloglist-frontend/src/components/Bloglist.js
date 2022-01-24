import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = ({ user }) => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div className="mx-auto flex flex-col justify-center py-10 text-gr1">
      <h1 className="text-3xl font-bold my-10">Bloglist</h1>
      <div className="mx-auto py-5 space-y-1">
        {blogs
          .sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
          .map(blog =>
            <div className="py-1" key={blog.id} user={user}>
              <Link
                to={`/blogs/${blog.id}`}
                className="text-lg font-semibold">
                <span>{blog.title}</span>
              </Link>
              <div className="flex">
                <div className="flex items-center text-gr3">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  <span className="text-xs">{blog.likes}</span>
                </div>
                <div className="ml-4 flex items-center text-gr3">
                  <svg className="flex shrink-0 w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
                  <span className="text-xs">{blog.comments.length}</span>
                </div>
                <div className="ml-4 flex flex-nowrap overflow-hidden w-2/5 max-w-9 items-center text-gr3">
                  <svg className="flex shrink-0 w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  <a href={blog.url} className="text-xs truncate">{blog.url}</a>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default BlogList