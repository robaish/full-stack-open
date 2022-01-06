import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const addNew = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    
    dispatch(setNotification(`You added: "${content}"`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

 return (
  <div>
    <h2>create new</h2>
    <form onSubmit={addNew}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  </div>
 )
}

export default AnecdoteForm