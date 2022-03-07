import { Alert } from '@mui/material'
import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const isErrMsg = message.includes('wrong') || message.includes('missing') || message.includes('only')

  return (
    <div>
      <Alert severity={!isErrMsg ? 'success' : 'error'}>
        {message}
      </Alert>
    </div>
  )
}

export default Notification
