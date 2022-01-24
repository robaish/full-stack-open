import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { logIn } from '../reducers/loginReducer'
import BlogList from './BlogList'
import LoginForm from './LoginForm'
import NewBlogForm from './NewBlogForm'
import Toggleable from './Toggleable'

const Home = ({ user }) => {
  const dispatch = useDispatch()

  const handleLogin = async (username, password) => {
    console.log('%c logging in with:', 'color: orange;', username, password)
    dispatch(logIn(username, password))
  }

  const newBlogFormRef = useRef()

  const addBlog = newBlog => {
    dispatch(createBlog(newBlog))
    newBlogFormRef.current.toggleVisibility()
  }

  return (
    <div className="mx-auto max-w-lg">
      {user.credentials === null
      ? <LoginForm handleLogin={handleLogin} />
      : <div className="mx-auto max-w-lg flex flex-col justify-center">
          <BlogList user={user} />
          <Toggleable buttonLabel="Add new blog post" ref={newBlogFormRef}>
            <NewBlogForm addBlog={addBlog} />
          </Toggleable>
        </div>
      }
      </div>
  )
}

export default Home