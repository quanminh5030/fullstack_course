import { createSlice } from "@reduxjs/toolkit"
import _ from "lodash"
import anecdotesServices from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdotes: (state, action) => {
      state.push(action.payload)
    },

    handleVote: (state, action) => {
      const newState = state.map(s => s.id === action.payload.id
        ? action.payload
        : s)
      return _.orderBy(newState, ['votes'], 'desc')
    },

    setInitialAnecdotes: (state, action) => {
      return _.orderBy(action.payload, ['votes'], 'desc')
    },
  }
})

export const { handleVote, addAnecdotes, setInitialAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesServices.getAll()
    dispatch(setInitialAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdotesServices.addAnecdote(content)
    dispatch(addAnecdotes(anecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(a => a.id === id)
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }

    const updatedAnecdote = await anecdotesServices.updateAnecdote(id, newAnecdote)
    dispatch(handleVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer