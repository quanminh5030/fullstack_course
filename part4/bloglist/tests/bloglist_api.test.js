const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('../utils/test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogList);
});

const loginUser = auth => {
  return function (done) {
    api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200)
      .end((err, res) => {
        auth.token = res.body.token;
        return done();
      });
  }
}

describe('GET request returns correct data', () => {
  test('list of blogs returns as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 100000);

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogList.length);
  });

  test('unique identifier property id existed', async () => {
    const response = await api.get('/api/blogs');
    const blogObj = response.body[0];

    expect(blogObj.id).toBeDefined();
  });
});

describe('POST request creates new blog post', () => {
  const auth = {};

  // get the token
  beforeEach(loginUser(auth));

  test('adding a blog fails with status 401 if a token is not provided', async () => {
    const newBlog = {
      title: 'Letter from Susan: Our 2022 Priorities',
      author: 'Susan Wojcicki',
      url: 'https://blog.youtube/inside-youtube/letter-susan-our-2022-priorities/',
      likes: 120
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map(r => r.title);

    expect(blogsAtEnd).toHaveLength(helper.initialBlogList.length);
    expect(titles).not.toContain(
      'Letter from Susan: Our 2022 Priorities'
    );
  });

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Letter from Susan: Our 2022 Priorities',
      author: 'Susan Wojcicki',
      url: 'https://blog.youtube/inside-youtube/letter-susan-our-2022-priorities/',
      likes: 120
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + auth.token)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map(r => r.title);

    expect(blogsAtEnd).toHaveLength(helper.initialBlogList.length + 1);
    expect(titles).toContain(
      'Letter from Susan: Our 2022 Priorities'
    );
  });

  test('blog without property likes have default 0 like', async () => {
    const newBlog = {
      title: 'Letter from Susan: Our 2022 Priorities',
      author: 'Susan Wojcicki',
      url: 'https://blog.youtube/inside-youtube/letter-susan-our-2022-priorities/'
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + auth.token)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb();
    const likes = blogsAtEnd.map(r => r.likes);

    expect(likes[blogsAtEnd.length - 1]).toBe(0);
  });

  test('blog without title and url return status 400', async () => {
    const newBlog = {
      title: '',
      author: 'Susan Wojcicki',
      url: '',
      likes: 200
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', 'bearer ' + auth.token)
      .expect(400)
  });
});

// Delete test break due to the initial test blog list does not have the user id 
describe('DELETE request delete single blog', () => {
  const auth = {};

  beforeEach(loginUser(auth));

  test('a blog with valid id can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'bearer ' + auth.token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogList.length - 1);

    const titles = blogsAtEnd.map(blog => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test('fails with status 400 if blog does not exist', async () => {
    const invalidId = '5a3d5da59070081a82a3445';

    await api
      .delete(`/api/blogs/${invalidId}`)
      .set('Authorization', 'bearer ' + auth.token)
      .expect(400)
  });

});

describe('PUT request update single blog', () => {

  test('a blog with valid id can be updated', async () => {
    const newBlog = {
      title: "Time To Take In The Weekly Dose Of Cute Animals",
      author: "marielru",
      url: "https://cheezburger.com/16277509/time-to-take-in-the-weekly-dose-of-cute-animals-171",
      likes: 150,
    };

    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd[0];
    delete updatedBlog.id;

    expect(updatedBlog).toEqual(newBlog);
  });

  test('fails with status 400 if blog does not exist', async () => {
    const invalidId = '5a3d5da59070081a82a3445';

    await api
      .put(`/api/blogs/${invalidId}`)
      .expect(400)
  });

  test('blog without title and url return status 400', async () => {
    const newBlog = {
      title: '',
      author: 'Susan Wojcicki',
      url: '',
      likes: 200
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  });

});

afterAll(async () => {
  await mongoose.connection.close()
})