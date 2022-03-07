import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { setToken } from './action/blogAction'
import blogReducer from './reducer/blogReducer'
import { notificationReducer } from './reducer/notificationReducer'
import userReducer from './reducer/userReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  message: notificationReducer,
  user: userReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

store.subscribe(() => {
  store.getState().user.user &&
    setToken(store.getState().user.user.token)
})

export default store
