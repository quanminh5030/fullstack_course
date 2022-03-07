import { Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import Notification from './Notification'

const LoginForm = ({ userCredential, handleChange, handleLogin }) => {
  const { message } = useSelector(state => state)

  return (
    <>
      <Typography variant='h3'>login to application</Typography>
      <Notification message={message} />
      <form style={{ margin: '10px 0' }} onSubmit={handleLogin}>
        <div>
          <TextField
            size='small'
            label='username'
            type="text"
            name="username"
            value={userCredential.username}
            onChange={handleChange}
            id="username"
          />
        </div>

        <div>
          <TextField
            size='small'
            label='password'
            type="password"
            name="password"
            value={userCredential.password}
            onChange={handleChange}
            id="password"
          />
        </div>

        <Button color='secondary' variant='contained' id="login-button" type="submit" sx={{ margin: '10px 0' }}>
          login
        </Button>
      </form>
    </>
  )
}

export default LoginForm
