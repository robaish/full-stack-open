import { useApolloClient } from '@apollo/client'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  if (!token) {
    localStorage.clear()
  }
  
  const notify = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token
        ? <div style={{display: 'inline'}}>
            <button onClick={() => setPage('add book')}>add book</button>
            <button onClick={logout}>log out</button>
          </div>
        : <button onClick={() => setPage('login')}>log in</button>
        }
        
      </div>
      <Authors
        show={page === 'authors'}
        setError={notify}
      />
      <Books
        show={page === 'books'}
      />
      <NewBook
        show={page === 'add book'}
        setError={notify}
        setPage={setPage}
      />
      <Login
        show={page === 'login'}
        setError={notify}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App