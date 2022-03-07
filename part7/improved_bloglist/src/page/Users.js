import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllUsers } from '../redux/action/userAction'

const Users = () => {
  const dispatch = useDispatch()

  const { users, error } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  if (error) {
    return <div>404 not found...</div>
  }

  return (
    <>
      <Typography variant='h4'>Users</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
          <TableHead sx={{ backgroundColor: '#2d2830' }}>
            <TableRow>
              <TableCell></TableCell>
              <TableCell sx={{ color: 'white' }} align="right">blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow
                key={u.id}
              >
                <TableCell component="th" scope="row">
                  <Button color='inherit' LinkComponent={Link} to={`/users/${u.id}`}>
                    {u.name}
                  </Button>
                </TableCell>
                <TableCell align="right">{u.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Users