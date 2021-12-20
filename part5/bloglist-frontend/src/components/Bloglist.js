import React from 'react';
import Blog from './Blog'

const Bloglist = ({ user, setUser, blogs }) => {
  
  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInBloglistUser')
    setUser(null)
  }

  return (
    <div>
      <h2>Blogs</h2>
      <div>
        <span>{user.name} logged in</span>
        <button
          type="button"
          onClick={handleLogOut}>
          Log out
        </button>
      </div>
      <div className="bloglist-container">
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  );
}

export default Bloglist