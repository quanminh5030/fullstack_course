import { Button } from '@mui/material'
import React, { useImperativeHandle, useState } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          color='secondary' variant='outlined'
          onClick={toggleVisibility}
        >
          {props.btnLabel}
        </Button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <Button color='secondary' onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglabel'

export default Togglable
