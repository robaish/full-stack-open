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
    <form className="mx-auto pt-40 flex flex-col justify-center items-center text-gr1" onSubmit={login}>
      <h2 className="text-2xl font-bold">Log in to Bloglist</h2>
      <div className="mt-10">
        <label htmlFor="username" className="block text-sm font-medium text-gr1">
          Username
        </label>
        <input
          type="text"
          id="username-input"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
          className="mt-1 block w-full max-w-md px-2 py-1 rounded-md shadow-sm text-sm text-black"
          />
      </div>
      <div className="mt-5">
        <label htmlFor="username" className="block text-sm font-medium text-gr1">
          Password
        </label>
        <input
          type="password"
          id="password-input"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
          className="mt-1 block w-full max-w-md px-2 py-1 rounded-md shadow-sm text-sm text-black"
          />
      </div>
      <button
        id="login-button"
        type="submit"
        className="mt-5 px-3 py-1 rounded-lg bg-accent1 text-sm font-semibold text-gr1 hover:bg-accent1b"
        >Log in
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm

