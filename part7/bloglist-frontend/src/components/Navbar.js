import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logOut } from '../reducers/loginReducer'
import NavUser from './NavUser'

const Navbar = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogOut = () => {
    dispatch(logOut())
    navigate('/')
  }

  const navigation = [
    { name: 'Blogs', slug: '/', icon: <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
    { name: 'Users', slug: '/users', icon: <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> }
  ]

  let activeClassName = 'flex align-middle px-3 py-1 rounded-md bg-gr4 text-sm font-semibold'

  return (
    <nav className="relative w-full flex justify-center p-1 bg-bg2 text-gr1 border-b border-bordercolor">
      <div className="space-x-4 flex justify-center">
        {navigation.map(item => (
          <NavLink
            key={item.name}
            to={item.slug}
            className={({ isActive }) =>
              isActive ? activeClassName : 'flex justify-between px-3 py-1 rounded-md text-gr3 text-sm font-semibold hover:bg-gr4 hover:br-1'
            }
          >{item.icon} {item.name}
          </NavLink>
        ))}
      </div>
      <NavUser user={user} handleLogOut={handleLogOut} />
    </nav>
  )
}

export default Navbar