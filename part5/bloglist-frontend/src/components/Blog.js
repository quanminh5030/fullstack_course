import React, { useEffect, useState } from "react";
import propTypes from "prop-types";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const btnStyle = {
  backgroundColor: "#4582e6",
  borderRadius: 6,
};

const Blog = ({ blog, likeBlog, currentUser, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [btnLabel, setBtnLabel] = useState("");

  useEffect(() => {
    showDetails ? setBtnLabel("hide") : setBtnLabel("view");
  }, [showDetails]);

  const toggleVisibility = () => {
    setShowDetails(!showDetails);
  };

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    const blogId = blog.id;
    delete updatedBlog.id;
    likeBlog(blogId, updatedBlog);
  };

  const blogDetails = () => {
    return (
      <div className="togglableContent">
        <div>{blog.url}</div>
        <div className="like">
          likes {blog.likes}
          <button id="like-button" onClick={handleLike}>
            like
          </button>
        </div>
        <div>{blog.user && blog.user.name}</div>
        {currentUser === blog.user.username && (
          <button
            id="remove-button"
            style={btnStyle}
            onClick={() => deleteBlog(blog)}
          >
            remove
          </button>
        )}
      </div>
    );
  };

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}{" "}
      <button id="view-button" onClick={toggleVisibility}>
        {btnLabel}
      </button>
      {showDetails && blogDetails()}
    </div>
  );
};

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  likeBlog: propTypes.func,
  currentUser: propTypes.string,
  deleteBlog: propTypes.func,
};

export default Blog;
