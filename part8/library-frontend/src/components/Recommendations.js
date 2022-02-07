import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_USER } from '../queries'

const Recommendations = ({ show, books }) => {
  const { loading, error, data } = useQuery(GET_USER, {
    pollInterval: 1000 // pointless web traffic but the only way I got this to work
  })

  if (!show) return null
  if (loading || data.me === null) return 'Loading...'
  if (error) return `Error: ${error}`

  const recommendedBooks = books.filter(b => b.genres.includes(data.me.favoriteGenre))

  return (
    <div>
      <h3>Books in your favorite genre, {data.me.favoriteGenre}</h3>
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
          {recommendedBooks.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations