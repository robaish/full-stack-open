import anecdoteService from '../services/anecdotes'

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
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_NEW',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default anecdoteReducer