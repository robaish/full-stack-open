import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { BOOKS_IN_GENRE } from '../queries'

const Recommendations = ({ show, userData }) => {
  const [user, setUser] = useState(null)
  const [getBookRecs, result] = useLazyQuery(BOOKS_IN_GENRE)

  useEffect(() => {
    if (userData && userData !== null) {
      setUser(userData.me)
    }
  }, [userData])

  const favGenre = user !== null ? user.favoriteGenre : ''

  useEffect(() => {
    getBookRecs({
      variables: { genre: favGenre }
    })
  }, [user]) //eslint-disable-line
  
  if (!show) return null

  if (result.data && user) {
    return (
      <div>
        <h3>Hi, {user.username}</h3>
        <p>Here are books in your favorite genre, <strong>{user.favoriteGenre}:</strong></p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {
            result.data.allBooks.map(book =>
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            )
            }
          </tbody>
        </table>
      </div>
    )
  }
  return 'Loading...'
}

export default Recommendations