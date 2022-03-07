import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, logout } from './redux/action/userAction'
import Blogs from './page/Blogs'
import Users from './page/Users'
import NavBar from './components/NavBar'
import User from './page/User'
import BlogDetails from './page/BlogDetails'
import { Typography } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()

  const { message } = useSelector(state => state)
  const { user } = useSelector(state => state.user)

  const [userCredential, setUserCredential] = useState({
    username: '',
    password: '',
  })

  const handleLoginChange = (event) => {
    setUserCredential({
      ...userCredential,
      [event.target.name]: event.target.value,
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(getUser(userCredential))
  }

  const handleLogout = () => {
    setUserCredential({ username: '', password: '' })
    dispatch(logout())
  }

  return (
    <Router>
      {user &&
        <NavBar
          name={user.name}
          handleLogout={handleLogout}
        />}
      <div>
        {user === null ? (
          <LoginForm
            userCredential={userCredential}
            handleChange={handleLoginChange}
            handleLogin={handleLogin}
          />
        ) : (
          <div style={{ fontSize: 'large' }}>
            <Typography sx={{ margin: '10px 0' }} variant='h3'>blog app</Typography>
            <Notification message={message} />

            <Routes>
              <Route path='/' element={<Blogs />} />
              <Route path='/users' element={<Users />} />
              <Route path='/users/:id' element={<User />} />
              <Route path='/blogs/:id' element={<BlogDetails />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
