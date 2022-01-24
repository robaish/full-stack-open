import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector(state => state.users)

  return (
    <div className="mx-auto w-11/12 max-w-lg py-10 text-gr1 flex flex-col justify-center">
      <h1 className="text-3xl font-bold my-10">Users</h1>
      <div>
      {users
        .sort((a, b) => b.blogs.length - a.blogs.length)
        .map(user =>
        <div className="mx-auto my-5" key={user.id}>
          <Link to={`/users/${user.id}`}><span className="text-accent1">{user.name}</span></Link>
          <div className="flex items-center text-gr3">
            <svg className="flex shrink-0 w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg>
            <span className="text-xs">{user.blogs.length} blog posts added</span>
          </div>
        </div>)}
      </div>
    </div>
  )
}

export default UserList