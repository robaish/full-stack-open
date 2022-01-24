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
    ? <ol>{blog.comments.map(
      (item, index) => <li className="py-3" key={index}>{index + 1}. {item}</li>)}</ol> // no stable ID so item index used as key
    : <p>No comments yet.</p>

  return (
    <div className="w-11/12 mt-5 flex flex-col max-w-lg">
      <h3 className="text-2xl font-bold">Comments</h3>
      <div className="mt-5">
        {commentList}
      </div>
      <div className="my-10">
        <h3 className="text-2xl font-bold">Your thoughts?</h3>
        <input
          className="my-5 block w-full max-w-md px-2 py-1 rounded-md shadow-sm text-base text-black"
          type="text"
          value={comment}
          placeholder="Write here..."
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="button"
          onClick={handleClick}
          className="px-3 py-1 rounded-lg bg-accent1 text-sm font-semibold text-gr1"
        >Submit comment
        </button>
      </div>
    </div>
  )
}

export default BlogComments