import { ADD_MESSAGE, CLEAR_MESSAGE } from '../action/notificationAction'

export const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return action.payload

    case CLEAR_MESSAGE:
      return action.payload

    default:
      return state
  }
}