import axios from 'axios'
import { useState, useEffect } from 'react'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    name &&
      axios(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then(data => {
          setCountry(data.data[0])
          setError('')
        })
        .catch(err => {
          console.log('error', err.message)
          setError(err.message)
        })
  }, [name])

  return {
    country,
    error
  }
}

export const useField = ({ type }) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}