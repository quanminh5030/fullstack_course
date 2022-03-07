import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (url) => {
  const [resources, setResources] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    (async () => {
      const response = await axios.get(url)
      setResources(response.data)
      setRefresh(false)
    })()
  }, [url, refresh])

  const create = async (newObj) => {
    const response = await axios.post(url, newObj)
    return response.data
  }

  const service = {
    create,
    setRefresh
  }

  return [resources, service]
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const inputProps = {
    type,
    value,
    onChange,
  }

  return {
    inputProps,
    reset
  }
}
