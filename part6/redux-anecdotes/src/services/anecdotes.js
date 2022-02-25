import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios(baseUrl)
  return response.data
}

const addAnecdote = async (content) => {
  const newAnecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const updateAnecdote = async (id, newAnecdote) => {
  const response = await axios.put(`${baseUrl}/${id}`, newAnecdote)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addAnecdote, updateAnecdote }