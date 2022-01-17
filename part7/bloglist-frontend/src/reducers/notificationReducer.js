const initialState = {
  status: null,
  message: ''
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SUCCESS': {
      return { ...state, status: 'success', message: action.message }
    }
    case 'ERROR': {
      return { ...state, status: 'error', message: action.message }
    }
    case 'CLEAR_NOTIFICATION': {
      return { ...state, status: null, message: '' }
    }
    default:
      return state
  }
}

export const notifySuccess = message => {
  return async dispatch => {
    dispatch({
      type: 'SUCCESS',
      message: message || 'Success!'
    })
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export const notifyError = message => {
  return async dispatch => {
    dispatch({
      type: 'ERROR',
      message: message || 'Something went wrong. Please try again.'
    })
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer