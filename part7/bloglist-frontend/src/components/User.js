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
      <div className="mx-auto w-11/12 max-w-lg py-10 space-y-5 text-gr1 flex flex-col justify-center">
        <h2 className="text-3xl font-bold my-10">{user.name}</h2>
        <h3 className="text-lg font-bold">Blog posts added</h3>
        <ul>
          {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
        </ul>
      </div>
    : <div className="mx-auto w-11/12 max-w-lg py-10 space-y-5 text-gr1 flex flex-col justify-center">
        <h2 className="text-3xl font-bold">{user.name}</h2>
        <p>...has not added any blog posts yet.</p>
      </div>
  }
  return null

}

export default User