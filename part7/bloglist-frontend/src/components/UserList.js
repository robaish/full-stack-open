import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector(state => state.users)

  return (
    <div className="users-container">
      <div className="flex flex-jc-sb flex-ai-c">
        <h3>Users</h3>
        <p><strong>Blog posts added</strong></p>
      </div>
      <div>
      {users
        .sort((a, b) => b.blogs.length - a.blogs.length)
        .map(user =>
        <div className="flex flex-jc-sb" key={user.id}>
          <Link to={`/users/${user.id}`}><span>{user.name}</span></Link>
          <span>{user.blogs.length}</span>
        </div>)}
      </div>
    </div>
  )
}

export default UserList