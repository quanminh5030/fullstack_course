import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({ addNew, setNotification }) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  let navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.inputProps.value,
      author: author.inputProps.value,
      info: info.inputProps.value,
      votes: 0
    })

    setNotification(`a new anecdote ${content.inputProps.value} created!`)
    navigate('/')
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputProps} />
        </div>
        <div>
          author
          <input {...author.inputProps} />
        </div>
        <div>
          url for more info
          <input {...info.inputProps} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew
