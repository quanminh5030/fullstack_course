import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const { users } = useSelector(state => state.user)
  const { id } = useParams()

  const user = users.find(u => u.id === id)

  if (!user) {
    return null
  }

  return (
    <>
      <Typography variant='h4'>{user.name}</Typography>
      <Typography varant='h5' fontWeight={600} >added blogs</Typography>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>)}
      </ul>
    </>
  )
}

export default User