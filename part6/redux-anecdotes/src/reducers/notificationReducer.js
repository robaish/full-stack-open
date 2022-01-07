const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

// initialize variable for
let timeoutID

export const setNotification = (notification, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    // if timeoutID created earlier, clear timeout
    if(timeoutID) {
      clearTimeout(timeoutID)
    }
    
    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000) 
  }
}

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer