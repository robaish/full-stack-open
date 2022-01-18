import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS': {
      return action.data
    }
    case 'CREATE_BLOG': {
      return [...state, action.data]
    }
    case 'LIKE_BLOG': {
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

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

export default blogReducer