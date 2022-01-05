const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'TEXT_MATCH': {
      return action.filter
    }
    default:
      return state
  }
}

export const textMatch = filter => {
  return {
    type: 'TEXT_MATCH',
    filter
  }
}

export default filterReducer