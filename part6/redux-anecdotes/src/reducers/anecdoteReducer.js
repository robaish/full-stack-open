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
      return state.map(a => a.id !== id ? a : action.data)
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

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const updatedAnecdote = await anecdoteService.update(votedAnecdote)
    console.log(updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export default anecdoteReducer