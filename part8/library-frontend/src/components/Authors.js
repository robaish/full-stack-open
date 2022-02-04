import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, SET_AUTHOR_BIRTHYEAR } from '../queries'

const Authors = ({ show, setError }) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('Neil Gaiman')
  const [born, setBorn] = useState('')

  const [ setAuthorBirthyear, result ] = useMutation(SET_AUTHOR_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS }],
    onError: ({ graphQLErrors }) => {
      if (graphQLErrors.length > 0) {
        setError(graphQLErrors[0].message)
      }
    }
  })
  
  const submit = async event => {
    event.preventDefault()
    setAuthorBirthyear({ variables: { name, born } })
    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('Author not found.')
    }
  }, [result.data]) // eslint-disable-line 

  if (!show) {
    return null
  }
  if (loading) return <p>Loading...</p> 
  if (error) return <p>Error :(</p>

  const authors = data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
        <label htmlFor="author-select">Author</label>
          <select
            name="author"
            id="author-select"
            value={name}
            onChange={({target}) => setName(target.value)}>
            {authors.map(a => 
              <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          <label htmlFor="born">Born</label>
          <input
            type="text"
            name="born"
            id="born"
            value={born}
            onChange={({target}) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">Update birthyear</button>
      </form>
    </div>
  )
}

export default Authors
