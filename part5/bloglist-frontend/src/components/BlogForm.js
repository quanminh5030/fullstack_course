import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blog, setBlog] = useState({ title: '', author: '', url: '' })

  const handleBlogChange = event => {
    setBlog({ ...blog, [event.target.name]: event.target.value })
  }

  const addBlog = event => {
    event.preventDefault()
    createBlog(blog)
    setBlog({ title: '', author: '', url: '' })
  }

  return <div>
    <h2>Create new</h2>
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type='text'
          name='title'
          value={blog.title}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          name='author'
          value={blog.author}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          name='url'
          value={blog.url}
          onChange={handleBlogChange}
        />
      </div>

      <button type='submit'>create</button>
    </form>
  </div>
}

export default BlogForm
