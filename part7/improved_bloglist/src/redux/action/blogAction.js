import axios from 'axios'
import { setMessage } from './notificationAction'

const baseUrl = '/api/blogs'
let token = null
let config = null

export const setToken = (newToken) => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

export const GET_BLOGS_SUCCESS = 'GET_BLOGS_SUCCESS'
export const GET_BLOGS_FAIL = 'GET_BLOGS_FAIL'

// blogs
export const getBlogsSuccess = (blogs) => {
  return {
    type: GET_BLOGS_SUCCESS,
    payload: blogs,
  }
}

export const getBlogsFail = (err) => {
  return {
    type: GET_BLOGS_FAIL,
    payload: err,
  }
}

export const getAllBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = (await axios.get(baseUrl)).data
      dispatch(getBlogsSuccess(blogs))
    } catch (err) {
      dispatch(getBlogsFail(err))
    }
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    try {
      const newBlog = (await axios.post(baseUrl, blog, config)).data
      dispatch(getAllBlogs())
      dispatch(setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5))
    } catch (err) {
      dispatch(setMessage(err.response.data.error, 5))
    }
  }
}

export const deleteBlog = (id, title, author) => {
  return async dispatch => {
    try {
      (await axios.delete(`${baseUrl}/${id}`, config)).data
      dispatch(getAllBlogs())
      dispatch(setMessage(`blog ${title} by ${author} is removed`, 5))
    } catch (err) {
      dispatch(setMessage(err.response.data.error, 5))
    }
  }
}

export const updateBlog = (id, updatedBlog) => {
  return async dispatch => {
    try {
      const blog = (await axios.put(`${baseUrl}/${id}`, updatedBlog, config)).data
      dispatch(getAllBlogs())
      dispatch(setMessage(`blog ${blog.title} by ${blog.author} updated`, 5))
    } catch (err) {
      dispatch(setMessage(err.response.data.error, 5))
    }
  }
}

export const commentBlog = (blogId, text) => {
  return async dispatch => {
    try {
      (await axios.post(`${baseUrl}/${blogId}/comments`, { comment: text })).data
      dispatch(getAllBlogs())
      dispatch(setMessage('comment added!', 5))
    } catch (err) {
      dispatch(setMessage(err.response.data.error, 5))
    }
  }
}