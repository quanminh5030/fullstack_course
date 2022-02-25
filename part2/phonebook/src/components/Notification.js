import React from 'react';

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const isErrorMsg = message.includes('removed') || message.includes('failed');

  return (
    <div className={!isErrorMsg ? 'success' : 'error'}>
      {message}
    </div>
  )
};

export default Notification;
