import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({ name, handleLogout }) => {
  return (
    <AppBar position='static' color='secondary'>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        />
        <Button color='inherit' LinkComponent={Link} to='/' >
          blogs
        </Button>
        <Button color='inherit' LinkComponent={Link} to='/users' >
          users
        </Button>
        <Typography fontStyle='italic'>{name} logged in</Typography>
        <Button
          onClick={handleLogout}
          variant='outlined'
          color='inherit'
          sx={{
            marginLeft: 10
          }}
        >
          logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar