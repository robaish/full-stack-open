import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification === '') {
    return <div className="notification-wrapper"></div>
  }

  return (
    <div className="notification-wrapper" style={style}>
      {notification}
    </div>
  )
}

export default Notification