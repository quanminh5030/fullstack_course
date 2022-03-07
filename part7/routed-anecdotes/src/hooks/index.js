import { useState } from 'react'

export const useField = ({ type }) => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const inputProps = {
    type,
    value,
    onChange
  }

  return {
    inputProps,
    reset
  }
}