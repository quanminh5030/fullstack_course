import React from 'react'
import propTypes from 'prop-types'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog }) => {

  return (
    <div style={blogStyle} className="blog">
      <Button
        LinkComponent={Link}
        to={`/blogs/${blog.id}`}
        color='inherit'
      >
        {blog.title} {blog.author}{' '}
      </Button>
    </div>
  )
}

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  likeBlog: propTypes.func,
  currentUser: propTypes.string,
  deleteBlog: propTypes.func,
}

export default Blog
