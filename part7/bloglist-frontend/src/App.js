import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, logOut } from './reducers/userReducer'
import { initBlogs, createBlog } from './reducers/blogReducer'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Bloglist from './components/Bloglist'
import Toggleable from './components/Toggleable'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const handleLogin = async (username, password) => {
    console.log('%c logging in with:', 'color: orange;', username, password)
    dispatch(logIn(username, password))
  }

  const handleLogOut = () => {
    dispatch(logOut())
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
          <h2>Bloglist</h2>
          <div>
            <span>{user.credentials.name} logged in</span>
            <button
              type="button"
              onClick={handleLogOut}>
              Log out
            </button>
          </div>
          <Toggleable buttonLabel="Add new blog post" ref={newBlogFormRef}>
            <NewBlogForm addBlog={addBlog} />
          </Toggleable>
          <Bloglist user={user} />
        </div>
      }
    </div>
  )
}

export default App