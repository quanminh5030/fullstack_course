import { GET_ALL_USERS_FAIL, GET_ALL_USERS_SUCCESS, GET_USER_FAIL, GET_USER_SUCCESS, LOGOUT_USER } from '../action/userAction'

const initialState = {
  user: JSON.parse(localStorage.getItem('loggedUser')),
  error: null,
  users: []
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      localStorage.setItem('loggedUser', JSON.stringify(action.payload))
      return {
        ...state,
        user: action.payload
      }

    case GET_USER_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case LOGOUT_USER:
      localStorage.removeItem('loggedUser')
      return {
        ...state,
        user: action.payload
      }

    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload
      }

    case GET_ALL_USERS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default userReducer