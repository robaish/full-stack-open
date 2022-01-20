import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_USERS': {
      return action.data
    }
    case 'GET_USER': {
      return action.data
    }
    default:
      return state
  }
}

// Action creators
export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const getUser = () => {
  return async dispatch => {
    const user = await userService.getUser()
    dispatch({
      type: 'GET_USER',
      data: user
    })
  }
}

export default userReducer