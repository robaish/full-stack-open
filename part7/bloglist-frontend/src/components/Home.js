import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { logIn } from '../reducers/loginReducer'
import Bloglist from './Bloglist'
import LoginForm from './LoginForm'
import NewBlogForm from './NewBlogForm'
import Notification from './Notification'
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
    <div className="app-wrapper">
        <Notification className="notification-bar" />
        {user.credentials === null
        ? <LoginForm handleLogin={handleLogin} />
        : <div>
            <Toggleable buttonLabel="Add new blog post" ref={newBlogFormRef}>
              <NewBlogForm addBlog={addBlog} />
            </Toggleable>
            <Bloglist user={user} />
          </div>
        }
      </div>
  )
}

export default Home