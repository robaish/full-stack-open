import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import Home from './components/Home'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import { setUser } from './reducers/loginReducer'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import Navbar from './components/Navbar'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

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
    <Router>
      <Navbar user={user} />
      <Notification className="notification-bar" />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/blogs/:id" element={<Blog user={user} />} />
      </Routes>
    </Router>
  )
}

export default App