const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1});
  res.json(users);
})

usersRouter.post('/', async (req, res) => {
  const body = req.body;

  if (body.password.length <= 3) {
    res.status(400).json({ error: 'password must have at least 3 characters' });
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();

    res.json(savedUser);
  }
})

module.exports = usersRouter;