import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const { loading, error, data } = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState(null)
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks)
    }
  }, [data])

  if (!props.show) {
    return null
  }
  if (loading) return <p>Loading...</p> 
  if (error) return <p>Error :(</p>

  const genres = books.map(b => b.genres).flat()
  const uniqueGenres = [...new Set(genres)]

  const filteredBooks = genre
  ? books.filter(b => b.genres.includes(genre))
  : books

  return (
    <div>
      <h2>books</h2>
      <ul style={{padding: '0'}}>
        <button type="button" onClick={() => setGenre(null)}>all genres</button>
        {uniqueGenres.map(genre =>
          <button type="button" key={genre} onClick={() => setGenre(genre)}>{genre}</button>
        )}
      </ul>
      {genre ? <h3>{genre} books</h3> : <h3>all books</h3>}
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
          {filteredBooks.map(book =>
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

export default Books