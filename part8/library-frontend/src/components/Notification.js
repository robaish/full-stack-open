import React from 'react'

const Notification = ({ notification }) => {
  if (notification.state === null) {
    return null
  }
  if(notification.state === 'success') {
    return <div className="notification success">{notification.message}</div>
  }
  if(notification.state === 'error') {
    return <div className="notification error">{notification.message}</div>
  }
}

export default Notification