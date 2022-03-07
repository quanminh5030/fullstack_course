import { Button, Typography, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { commentBlog, deleteBlog, updateBlog } from '../redux/action/blogAction'

const BlogDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { blogs, error } = useSelector(state => state.blogs)
  const blog = blogs.find(b => b.id === id)

  const [comment, setComment] = useState('')

  if (error) {
    return <div>404 not found...</div>
  }

  if (!blog) {
    return null
  }

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const blogId = blog.id
    delete updatedBlog.id

    dispatch(updateBlog(blogId, updatedBlog))
  }

  const handleDelete = () => {
    const { id, title, author } = blog
    const shouldRemove = window.confirm(`Remove blog ${title} by ${author}`)
    if (shouldRemove) {
      dispatch(deleteBlog(id, title, author))
      navigate('/')
    }
  }

  const addComment = () => {
    dispatch(commentBlog(blog.id, comment))
    setComment('')
  }

  return (
    <>
      <Typography variant='h4'>{blog.title} {blog.author}</Typography>
      <Button
        variant='outlined' color='secondary'
        href={blog.url}
        sx={{ margin: 2 }}>
        {blog.url}
      </Button>
      <div>{blog.likes} likes
        <Button
          size='small' variant='contained' color='secondary' onClick={handleLike}
          sx={{ marginLeft: 1 }}
        >
          like
        </Button>
      </div>
      <div>added by {blog.author}</div>
      <Button
        size='small' variant='contained' color='secondary' onClick={handleDelete}
        sx={{ margin: 1 }}>
        remove
      </Button>

      <Typography variant='h4'>comments</Typography>

      <TextField
        label='comment'
        name='comment'
        value={comment}
        onChange={e => setComment(e.target.value)}
        size='small'
      />
      <Button
        variant='contained' color='secondary' size='small'
        onClick={addComment}
        sx={{ marginLeft: 1 }}>
        add comment
      </Button>

      <ul>
        {blog.comments.map(c =>
          <li key={c}>
            {c}
          </li>)}
      </ul>
    </>
  )
}

export default BlogDetails