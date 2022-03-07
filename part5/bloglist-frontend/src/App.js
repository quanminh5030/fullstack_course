import React, { useState, useEffect, useRef } from "react";
import * as _ from "lodash";

import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userCredential, setUserCredential] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogsByLikes = _.orderBy(blogs, "likes", "desc");
      setBlogs(sortedBlogsByLikes);
    });
  }, [message]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLoginChange = (event) => {
    setUserCredential({
      ...userCredential,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login(userCredential);
      setUser(user);

      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setMessage("login successfully");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (err) {
      console.error("error", err.response.data.error);
      setMessage("wrong username or password");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const createBlog = async (blog) => {
    blogFormRef.current.toggleVisibility();

    try {
      const newBlog = await blogService.addBlog(blog);
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      console.log("error", error.response.data.error);
      setMessage(error.response.data.error);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const likeBlog = async (blogId, updatedBlog) => {
    const blog = await blogService.updateBlog(blogId, updatedBlog);

    setMessage(`blog ${blog.title} by ${blog.author} updated`);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const deleteBlog = async ({ id, title, author }) => {
    const shouldRemove = window.confirm(`Remove blog ${title} by ${author}`);
    if (shouldRemove) {
      await blogService.deleteBlog(id);

      setMessage(`blog ${title} by ${author} is removed`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const blogForm = () => {
    return (
      <Togglable btnLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
    );
  };

  return (
    <div>
      {user === null ? (
        <>
          <h2>login to application</h2>
          <Notification message={message} />
          <LoginForm
            userCredential={userCredential}
            handleChange={handleLoginChange}
            handleLogin={handleLogin}
          />
        </>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification message={message} />
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>

          {blogForm()}

          <br />

          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              currentUser={user.username}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
