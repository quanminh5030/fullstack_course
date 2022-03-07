import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

  const handleBlogChange = (event) => {
    setBlog({ ...blog, [event.target.name]: event.target.value })
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(blog)
    setBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <Typography variant='h4'>Create new</Typography>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label='Title'
            name="title"
            value={blog.title}
            onChange={handleBlogChange}
            placeholder="type the title"
            id="title"
            margin='dense'
            size='small'
          />
        </div>
        <div>
          <TextField
            label='Author'
            name="author"
            value={blog.author}
            onChange={handleBlogChange}
            placeholder="type the author"
            id="author"
            margin='dense'
            size='small'
          />
        </div>
        <div>
          <TextField
            label='Url'
            name="url"
            value={blog.url}
            onChange={handleBlogChange}
            placeholder="type the url"
            id="url"
            margin='dense'
            size='small'
          />
        </div>

        <Button color='secondary' id="create-button" type="submit">
          create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
