import React from 'react'

const errMsg = {
  fontSize: 'larger',
  border: '4px solid red',
  borderRadius: 5,
  background: '#c9c8c7',
  color: 'red',
  padding: 10,
  margin: '20px 0',
}

const succMsg = {
  fontSize: 'larger',
  border: '4px solid green',
  borderRadius: 5,
  background: '#c9c8c7',
  color: 'green',
  padding: 10,
  margin: '20px 0',
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const isErrMsg = message.includes('wrong') || message.includes('missing')

  return (
    <div style={isErrMsg ? errMsg : succMsg}>
      {message}
    </div>
  )
}

export default Notification
