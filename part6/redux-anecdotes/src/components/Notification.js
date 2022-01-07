import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (props.notification === '') {
    return <div className="notification-wrapper"></div>
  }
  return (
    <div className="notification-wrapper" style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}
const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification