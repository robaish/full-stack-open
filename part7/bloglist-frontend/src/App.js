import React, { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Bloglist from './components/Bloglist'
import Toggleable from './components/Toggleable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ state: null, message: '' })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [blogs])

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
    } catch (e) {
      console.log(e)
      setNotification({ state: 'danger', message: `${e.response.data.error}` })
      setTimeout(() => setNotification({ state: null }), 5000)
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
      setBlogs(blogs.concat(newBlog))
      setNotification({ state: 'success', message: `Blog post added: ${newBlog.title} by ${newBlog.author}` })
      setTimeout(() => setNotification({ state: null }), 5000)
    } catch(e) {
      console.log(e)
      setNotification({ state: 'danger', message: `${e.response.data.error}` })
      setTimeout(() => setNotification({ state: null }), 5000)
    }
  }

  const updateBlog = async (id, updatedBlog) => {
    try {
      await blogService.update(id, updatedBlog)
      setNotification({ state: 'success', message: `Like added: ${updatedBlog.title} by ${updatedBlog.author}` })
      setTimeout(() => setNotification({ state: null }), 5000)
    } catch(e) {
      setNotification({ state: 'danger', message: `${e.response.data.error}` })
      setTimeout(() => setNotification({ state: null }), 5000)
    }
  }

  const removeBlog = async id => {
    try {
      await blogService.remove(id)
      setNotification({ state: 'success', message: 'Blog post deleted' })
      setTimeout(() => setNotification({ state: null }), 5000)
    } catch(e) {
      setNotification({ state: 'danger', message: `${e.response.data.error}` })
      setTimeout(() => setNotification({ state: null }), 5000)
    }
  }

  return (
    <div className="app-wrapper">
      <Notification className="notification-bar" notification={notification} />
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