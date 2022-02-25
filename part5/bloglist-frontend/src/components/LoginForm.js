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
      />
    </div>

    <div>
      password
      <input
        type='password'
        name='password'
        value={userCredential.password}
        onChange={handleChange}
      />
    </div>

    <button type='submit'>login</button>
  </form>
}

export default LoginForm
