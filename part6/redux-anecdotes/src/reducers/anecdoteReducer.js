const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES': {
      return action.data
    }
    case 'ADD_NEW': {
      return [...state, action.data]
    }
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToFind = state.find(a => a.id === id)
      const updatedAnecdote = {
        ...anecdoteToFind,
        votes: anecdoteToFind.votes + 1
      }
      return state.map(a => a.id !== id ? a : updatedAnecdote)
    }
    default:
      return state
  }
}

// Action creators
export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}


export const createAnecdote = content => {
  return {
    type: 'ADD_NEW',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export const voteAnecdote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default anecdoteReducer