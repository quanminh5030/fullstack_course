
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

const addMessage = (text) => {
  return {
    type: ADD_MESSAGE,
    payload: text
  }
}

const clearMessage = () => {
  return {
    type: CLEAR_MESSAGE,
    payload: null
  }
}

let timeoutId = 0

export const setMessage = (text, time) => {
  return dispatch => {
    dispatch(addMessage(text))

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(clearMessage())
    }, time * 1000)
  }
}