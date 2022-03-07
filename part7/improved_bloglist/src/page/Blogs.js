import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import { addBlog, getAllBlogs } from '../redux/action/blogAction'

const Blogs = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const { blogs, error } = useSelector(state => state.blogs)
  const { user } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getAllBlogs())
  }, [])

  const createBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(addBlog(blog))
  }

  const blogForm = () => {
    return (
      <Togglable btnLabel="create new" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
    )
  }

  if (error) {
    return <div>404 not found...</div>
  }

  return (
    <>
      {blogForm()}
      <br />

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          currentUser={user.username}
        />
      ))}
    </>
  )
}

export default Blogs