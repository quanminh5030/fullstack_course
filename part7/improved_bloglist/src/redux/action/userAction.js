import axios from 'axios'
import { setMessage } from './notificationAction'
const baseUrl = '/api/login'

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAIL = 'GET_USER_FAIL'
export const LOGOUT_USER = 'LOGOUT_USER'
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS'
export const GET_ALL_USERS_FAIL = 'GET_ALL_USERS_FAIL'

// current user
export const getUserSuccess = (user) => {
  return {
    type: GET_USER_SUCCESS,
    payload: user
  }
}

export const getUserFail = (err) => {
  return {
    type: GET_USER_FAIL,
    payload: err
  }
}

export const getUser = (credentials) => {
  return async dispatch => {
    try {
      const userInfo = (await axios.post(baseUrl, credentials)).data
      dispatch(setMessage('login successfully', 5))
      dispatch(getUserSuccess(userInfo))
    } catch (err) {
      dispatch(setMessage('wrong username or password', 5))
      dispatch(getUserFail(err.message))
    }
  }
}

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
    payload: null
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(logoutUser())
    dispatch(setMessage('logout successfully!', 5))
  }
}

// for all users
export const getAllUsersSuccess = (users) => {
  return {
    type: GET_ALL_USERS_SUCCESS,
    payload: users
  }
}

export const getAllUsersFail = (err) => {
  return {
    type: GET_ALL_USERS_FAIL,
    payload: err
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    try {
      const users = (await axios.get('/api/users')).data
      dispatch(getAllUsersSuccess(users))
    } catch (err) {
      dispatch(getAllUsersFail(err.message))
    }
  }
}