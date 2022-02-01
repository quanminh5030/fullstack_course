const _ = require('lodash');

const dummy = blogs => {
  if (blogs.length >= 0) return 1;
}

const totalLikes = blogs => {
  const total = blogs.reduce((prev, cur) => prev + cur.likes, 0);
  return total;
}

const favoriteBlog = blogs => {
  const mostLikes = blogs.reduce((prev, cur) => Math.max(prev, cur.likes), 0);
  const blogWithMostLikes = blogs.filter(blog => blog.likes === mostLikes);
  return blogWithMostLikes[0];
}

const mostBlogs = blogs => {
  const authorWithBlogs = _.map(_.countBy(blogs, 'author'), (value, key) => ({
    author: key,
    blogs: value
  }))
  const authorWithMostBlogs = _.orderBy(authorWithBlogs, ['blogs'], 'desc')[0];
  return authorWithMostBlogs;
}

const mostLikes = blogs => {
  const authorWithLikes = _.map(_.groupBy(blogs, 'author'), (value, key) => ({
    author: key,
    likes: _.sumBy(value, 'likes')
  }));
  const authorWithMostLikes = _.orderBy(authorWithLikes, ['likes'], 'desc')[0];
  return authorWithMostLikes;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}