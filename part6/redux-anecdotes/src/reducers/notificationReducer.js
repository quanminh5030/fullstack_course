import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    addNotification: (state, action) => {
      return action.payload
    },

    clearNotification: () => {
      return ''
    }
  }
})

export const { addNotification, clearNotification } = notificationSlice.actions

let timeoutId = 0

export const setNotification = (text, time) => {

  return dispatch => {
    dispatch(addNotification(text))

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer