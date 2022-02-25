import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Programming to Interface Vs to Implementation',
  author: 'Dmitri Pavlutin',
  url: 'https://dmitripavlutin.com/interface-vs-implementation/',
  likes: 100
}

describe('first renders Blog', () => {
  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} />).container
  })

  test('display title', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Programming to Interface Vs to Implementation')
  })

  test('display author', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Dmitri Pavlutin')
  })

  test('not display url', () => {
    const div = container.querySelector('.blog')
    expect(div).not.toHaveTextContent('https://dmitripavlutin.com/interface-vs-implementation/')
  })

  test('not display number of likes', () => {
    const div = container.querySelector('.blog')
    expect(div).not.toHaveTextContent(100)
  })

})

