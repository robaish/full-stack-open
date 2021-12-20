import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
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
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    console.log('%c logging in with:', 'color: orange;', username, password);
    try {
      const userData = await loginService.login({ username, password })
      setUser(userData)
      setUsername('')
      setPassword('')      
    } catch (e) {
      console.log(e)
    }
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
      : <Bloglist 
          blogs={blogs} 
          user={user}
        />
      }
    </div>
  )
}

export default App