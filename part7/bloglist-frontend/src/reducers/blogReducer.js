import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS': {
      return action.data
    }
    case 'CREATE_BLOG': {
      return [...state, action.data]
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
    const blogs = await blogService.create(blog)
    dispatch({
      type: 'CREATE_BLOG',
      data: blogs
    })
  }
}

export default blogReducer