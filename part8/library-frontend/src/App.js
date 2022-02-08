import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import Notification from './components/Notification'
import { ALL_BOOKS, BOOK_ADDED, GET_USER } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [getUser, result] = useLazyQuery(GET_USER)
  const [update, setUpdate] = useState(false)
  const [notification, setNotification] = useState({ state: null, message: '' })
  const client = useApolloClient()
  
  const notify = (state, message) => {
    setNotification({ state: `${state}`, message: `${message}` })
    setTimeout(() => {
      setNotification({ state: null })
    }, 5000)
  }

  const updateCacheWith = addedBook => {
    const includedIn = (set, object) => set.map(b => b.id).includes(object.id)
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify('success', `Added ${addedBook.title}`)
      updateCacheWith(addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const goToRecs = () => {
    getUser()
    setPage('recommendations')
  }

  if (!token) {
    localStorage.clear()
  }
  
  return (
    <div>
      <Notification notification={notification} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token
        ? <div style={{display: 'inline'}}>
            <button onClick={() => setPage('add book')}>add book</button>
            <button onClick={goToRecs}>recommendations</button>
            <button onClick={logout}>log out</button>
          </div>
        : <button onClick={() => setPage('login')}>log in</button>
        }
        
      </div>
      <Authors
        show={page === 'authors'}
        notify={notify}
      />
      <Books
        show={page === 'books'}
        setUpdate={setUpdate}
      />
      <NewBook
        show={page === 'add book'}
        notify={notify}
        setPage={setPage}
        updateCacheWith={updateCacheWith}
      />
      <Recommendations
        show={page === 'recommendations'}
        userData={result ? result.data : null}
        update={update}
      />
      <Login
        show={page === 'login'}
        notify={notify}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App