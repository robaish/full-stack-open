import React from 'react'

const NavUser = ({ user, handleLogOut }) => {
  if (user.credentials) {
    return (
      <div className="absolute right-2 flex align-middle px-3 py-1 rounded-md hover:bg-gr4 br-1 text-sm font-semibold">
        <button
          type="button"
          className="text-sm"
          onClick={handleLogOut}>
          Log out
        </button>
        <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
      </div>
    )
  }
  return null
}

export default NavUser