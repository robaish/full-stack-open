import loginService from '../services/login'
import blogService from '../services/blogs'
import { notifyError, notifySuccess } from './notificationReducer'

const loginReducer = (state = { credentials: null }, action) => {
  switch(action.type) {
    case 'LOGIN': {
      return { ...state, credentials: action.data }
    }
    case 'SET_USER': {
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
      window.localStorage.setItem('loggedInBloglistUser', JSON.stringify(userData))
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

export const setUser = userData => {
  blogService.setToken(userData.token)
  return {
    type: 'SET_USER',
    data: userData
  }
}

export const logOut = () => {
  window.localStorage.removeItem('loggedInBloglistUser')
  return {
    type: 'LOGOUT'
  }
}

export default loginReducer
