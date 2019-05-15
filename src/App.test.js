import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

describe('App component testing', () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn()
    window.IntersectionObserver.prototype.observe = jest.fn()
    window.IntersectionObserver.prototype.disconnect = jest.fn()
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
