import React from 'react'

const LoginForm = (props) => (
  <form onSubmit={props.handleLogin}>
    <h2>Log in to Bloglist</h2>
    <div>
      username:
      <input
        type="text"
        value={props.username}
        name="username"
        onChange={({ target }) => props.setUsername(target.value)}
      />
    </div>
    <div>
      password:
      <input
          type="password"
          value={props.password}
          name="password"
          onChange={({ target }) => props.setPassword(target.value)}
        />
    </div>
    <button type="submit">Log in</button>
  </form>
)

export default LoginForm

