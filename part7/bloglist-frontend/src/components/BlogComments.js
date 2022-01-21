import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const BlogComments = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleClick = event => {
    event.preventDefault()
    dispatch(addComment(blog, comment))
    setComment('')
  }

  const commentList = blog.comments.length > 0
    ? <ul>{blog.comments.map(
      (item, index) => <li key={index}>{item}</li>)}</ul> // no stable ID so item index used as key
    : <p>No comments yet.</p>

  return (
    <div>
      <h3>Comments</h3>
      <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
      <button type="button" onClick={handleClick}>Submit</button>
      {commentList}
    </div>
  )
}

export default BlogComments