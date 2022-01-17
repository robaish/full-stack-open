import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { notifySuccess, notifyError } from './reducers/notificationReducer'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Bloglist from './components/Bloglist'
import Toggleable from './components/Toggleable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBloglistUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (username, password) => {
    console.log('%c logging in with:', 'color: orange;', username, password)
    try {
      const userData = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInBloglistUser', JSON.stringify(userData))
      blogService.setToken(userData.token)
      setUser(userData)
      dispatch(notifySuccess('Welcome back.'))
    } catch (e) {
      console.log(e)
      dispatch(notifyError(`${e.response.data.error}`))
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInBloglistUser')
    setUser(null)
  }

  const newBlogFormRef = useRef()

  const addBlog = async (newBlog) => {
    try {
      newBlogFormRef.current.toggleVisibility()
      await blogService.create(newBlog)
      // setBlogs(blogs.concat(newBlog))
      dispatch(notifySuccess(`Blog post added: ${newBlog.title} by ${newBlog.author}`))
    } catch(e) {
      console.log(e)
      dispatch(notifyError(`${e.response.data.error}`))
    }
  }

  const updateBlog = async (id, updatedBlog) => {
    try {
      await blogService.update(id, updatedBlog)
      dispatch(notifySuccess(`Like added: ${updatedBlog.title} by ${updatedBlog.author}`))
    } catch(e) {
      dispatch(notifyError(`${e.response.data.error}`))
    }
  }

  const removeBlog = async id => {
    try {
      await blogService.remove(id)
      dispatch(notifySuccess('Blog post deleted'))
    } catch(e) {
      dispatch(notifyError(`${e.response.data.error}`))
    }
  }

  return (
    <div className="app-wrapper">
      <Notification className="notification-bar" />
      {user === null
      ? <LoginForm handleLogin={handleLogin} />
      : <div>
          <h2>Bloglist</h2>
          <div>
            <span>{user.name} logged in</span>
            <button
              type="button"
              onClick={handleLogOut}>
              Log out
            </button>
          </div>
          <Toggleable buttonLabel="Add new blog post" ref={newBlogFormRef}>
            <NewBlogForm addBlog={addBlog} />
          </Toggleable>
          <Bloglist
            blogs={blogs}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
            user={user}
          />
        </div>
      }
    </div>
  )
}

export default App