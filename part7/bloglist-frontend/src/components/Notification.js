import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification.status === null) {
    return null
  }
  if (notification.status === 'success') {
    return (
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 bg-success rounded-md px-4 text-gr1">
        {notification.message}
      </div>)
  }
  if (notification.status === 'error') {
    return (
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 bg-error rounded-md px-4 text-gr1">
        {notification.message}
      </div>)
  }
}

export default Notification