import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_USERS': {
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

export default userReducer