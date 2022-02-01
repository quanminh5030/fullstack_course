const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogList = [
  {
    title: "Time To Take In The Weekly Dose Of Cute Animals",
    author: "marielru",
    url: "https://cheezburger.com/16277509/time-to-take-in-the-weekly-dose-of-cute-animals-171",
    likes: 100,
  },
  {
    title: "A Timeline Of The Science Behind Cure Rare Disease",
    author: "Cure Rare Disease",
    url: "https://www.cureraredisease.org/blog-posts/a-timeline-of-the-science-behind-cure-rare-disease",
    likes: 260,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
}

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
}

module.exports = {
  initialBlogList, blogsInDb, usersInDb
}