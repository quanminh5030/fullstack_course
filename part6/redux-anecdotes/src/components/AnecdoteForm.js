import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = event => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.createAnecdote(anecdote)
    props.setNotification('new anecdote is added to the list', 5)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)