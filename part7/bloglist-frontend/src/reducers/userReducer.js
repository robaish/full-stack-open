import loginService from '../services/login'
import blogService from '../services/blogs'
import { notifyError, notifySuccess } from './notificationReducer'

const userReducer = (state = { credentials: null }, action) => {
  switch(action.type) {
    case 'LOGIN': {
      return { ...state, credentials: action.data }
    }
    case 'LOGOUT': {
      return { ...state, credentials: null }
    }
    default:
      return state
  }
}

export const logIn = (username, password) => {
  return async dispatch => {
    try {
      const userData = await loginService.login({ username, password })
      blogService.setToken(userData.token)
      dispatch({
        type: 'LOGIN',
        data: userData
      })
      dispatch(notifySuccess('Welcome back.'))
      } catch(e) {
          dispatch(notifyError(`${e.response.data.error}`))
      }
  }
}

export const logOut = () => {
  return {
    type: 'LOGOUT'
  }
}

export default userReducer
