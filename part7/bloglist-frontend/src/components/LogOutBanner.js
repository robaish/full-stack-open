import React from 'react'

const LogOutBanner = ({ user, handleLogOut }) => {
  if (user.credentials) {
    return (
      <div>
        <span>{user.credentials.name} logged in</span>
        <button
          type="button"
          onClick={handleLogOut}>
          Log out
        </button>
      </div>
    )
  }
  return null
}

export default LogOutBanner