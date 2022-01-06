import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer';
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = id => {
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted for: "${anecdote.content}"`, 5))
  }

  const searchString = useSelector(state => state.filter)
  const matchingAnecdotes = anecdotes.filter(a => a.content.includes(searchString))

  return(
    <div>
      {[...matchingAnecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList