import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Bloglist from './components/Bloglist'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  const handleLogin = async event => {
    event.preventDefault()
    console.log('%c logging in with:', 'color: orange;', username, password)
    try {
      const userData = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInBloglistUser', JSON.stringify(userData))
      blogService.setToken(userData.token)
      setUser(userData)
      setUsername('')
      setPassword('')
    } catch (e) {
      console.log(e)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInBloglistUser')
    setUser(null)
  }

  return (
    <div>
      {user === null
      ? <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
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
          <Bloglist
            blogs={blogs}
          />
          <NewBlogForm
            blogs={blogs}
            setBlogs={setBlogs}
          />

        </div>
      }
    </div>
  )
}

export default App