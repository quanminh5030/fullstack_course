import React from 'react'

const LoginForm = ({ userCredential, handleChange, handleLogin }) => {
  return <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type='text'
        name='username'
        value={userCredential.username}
        onChange={handleChange}
        id='username'
      />
    </div>

    <div>
      password
      <input
        type='password'
        name='password'
        value={userCredential.password}
        onChange={handleChange}
        id='password'
      />
    </div>

    <button id='login-button' type='submit'>login</button>
  </form>
}

export default LoginForm
