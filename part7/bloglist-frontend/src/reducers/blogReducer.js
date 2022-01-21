import blogService from '../services/blogs'
import { notifyError, notifySuccess } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS': {
      return action.data
    }
    case 'GET_BLOG': {
      return action.data
    }
    case 'CREATE_BLOG': {
      return [...state, action.data]
    }
    case 'LIKE_BLOG': {
      return state.map(blog => blog.id === action.data.id ? action.data : blog)
    }
    case 'ADD_COMMENT': {
      return state.map(blog => blog.id === action.data.id ? action.data : blog)
    }
    case 'REMOVE_BLOG': {
      return state.filter(blog => blog.id !== action.data)
    }
    default:
      return state
  }
}

// Action creators
export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const getBlog = () => {
  return async dispatch => {
    const blog = await blogService.getBlog()
    dispatch({
      type: 'GET_BLOG',
      data: blog
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch({
        type: 'CREATE_BLOG',
        data: newBlog
      })
      dispatch(notifySuccess(`Blog post added: ${newBlog.title} by ${newBlog.author}`))
    } catch(e) {
      dispatch(notifyError(`${e.response.data.error}`))
    }
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(blog)
      dispatch({
        type: 'LIKE_BLOG',
        data: updatedBlog
      })
      dispatch(notifySuccess(`Like added: ${updatedBlog.title} by ${updatedBlog.author}`))
    } catch(e) {
      dispatch(notifyError(`${e.response.data.error}`))
    }
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.addComment(blog, comment)
      dispatch({
        type: 'ADD_COMMENT',
        data: updatedBlog
      })
      dispatch(notifySuccess('Thanks for your input!'))
    } catch(e) {
      dispatch(notifyError(`${e.response.data.error}`))
    }
  }
}

export const removeBlog = id => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: id
      })
      dispatch(notifySuccess('Blog post deleted'))
    } catch(e) {
        dispatch(notifyError(`${e.response.data.error}`))
    }
  }
}

export default blogReducer