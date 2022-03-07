import _ from 'lodash'
import { GET_BLOGS_FAIL, GET_BLOGS_SUCCESS } from '../action/blogAction'

const initialState = {
  blogs: [],
  error: null,
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: _.orderBy(action.payload, 'likes', 'desc')
      }

    case GET_BLOGS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default blogReducer
