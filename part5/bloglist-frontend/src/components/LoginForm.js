import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = event => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }
  return (
    <form onSubmit={login}>
      <h2>Log in to Bloglist</h2>
      <div>
        username:
        <input
          type="text"
          id="username-input"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password:
        <input
          type="password"
          id="password-input"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button id="login-button" type="submit">Log in</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm

