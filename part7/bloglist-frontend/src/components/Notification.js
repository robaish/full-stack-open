import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification.status === null) {
    return null
  }
  if (notification.status === 'success') {
    return <div className="notification success">{notification.message}</div>
  }
  if (notification.status === 'error') {
    return <div className="notification error">{notification.message}</div>
  }
}

export default Notification