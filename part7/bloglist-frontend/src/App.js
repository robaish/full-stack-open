import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LogOutBanner from './components/LogOutBanner'
import Home from './components/Home'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import { logOut, setUser } from './reducers/loginReducer'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'


const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logOut())
  }

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBloglistUser')
    if (loggedInUserJSON) {
      const userData = JSON.parse(loggedInUserJSON)
      dispatch(setUser(userData))
    }
  }, [])

  return (
    <>
      <h2>Bloglist</h2>
      <LogOutBanner user={user} handleLogOut={handleLogOut} />
      <Router>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/users/:id" element={<User user={user} />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/blogs/:id" element={<Blog user={user} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App