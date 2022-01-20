import React from 'react'
import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

const User = () => {
  const users = useSelector(state => state.users)

  const match = useMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  if (user) {
    return user.blogs.length > 0
    ?
      <div>
        <h2>{user.name}</h2>
        <h3>Blog posts added</h3>
        <ul>
          {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
        </ul>
      </div>
    : <div>
        <h2>{user.name}</h2>
        <p>...has not added any blog posts yet.</p>
      </div>
  }
  return null

}

export default User