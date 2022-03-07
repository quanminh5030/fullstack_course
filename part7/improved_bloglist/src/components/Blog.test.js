import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

const blog = {
  title: 'Programming to Interface Vs to Implementation',
  author: 'Dmitri Pavlutin',
  url: 'https://dmitripavlutin.com/interface-vs-implementation/',
  likes: 100,
  user: {
    username: 'Quan Dao',
  },
}

describe('first renders Blog', () => {
  let container, div

  beforeEach(() => {
    container = render(<Blog blog={blog} />).container
    div = container.querySelector('.blog')
  })

  test('display title & author', () => {
    expect(div).toHaveTextContent(
      'Programming to Interface Vs to Implementation'
    )
    expect(div).toHaveTextContent('Dmitri Pavlutin')
  })
})

describe('view button works', () => {
  let container, div

  beforeEach(() => {
    container = render(<Blog blog={blog} />).container
    div = container.querySelector('.blog')
  })

  test('not display url & likes by default', () => {
    expect(div).not.toHaveTextContent(
      'https://dmitripavlutin.com/interface-vs-implementation/'
    )
    expect(div).not.toHaveTextContent(100)
  })

  test('display url & likes after clicking the view button', () => {
    const button = screen.getByText('view')
    userEvent.click(button)

    expect(div).toHaveTextContent(
      'https://dmitripavlutin.com/interface-vs-implementation/'
    )
    expect(div).toHaveTextContent(100)
  })
})

describe('like button works', () => {
  test('like function is called twice when like btn is clicked twice', () => {
    const likeBlogMock = jest.fn()

    render(<Blog blog={blog} likeBlog={likeBlogMock} />)

    const viewBtn = screen.getByText('view')
    userEvent.click(viewBtn)

    const likeBtn = screen.getByText('like')
    userEvent.dblClick(likeBtn)

    expect(likeBlogMock.mock.calls).toHaveLength(2)
  })
})

describe('Blog form works', () => {
  test('The form is called with the right details about new blog', () => {
    const createBlogMock = jest.fn()

    render(<BlogForm createBlog={createBlogMock} />)

    const titleInput = screen.getByPlaceholderText('type the title')
    const authorInput = screen.getByPlaceholderText('type the author')
    const urlInput = screen.getByPlaceholderText('type the url')
    const submitBtn = screen.getByText('create')

    userEvent.type(titleInput, blog.title)
    userEvent.type(authorInput, blog.author)
    userEvent.type(urlInput, blog.url)
    userEvent.click(submitBtn)

    expect(createBlogMock.mock.calls).toHaveLength(1)
    expect(createBlogMock.mock.calls[0][0]).toEqual({
      title: blog.title,
      author: blog.author,
      url: blog.url,
    })
  })
})
