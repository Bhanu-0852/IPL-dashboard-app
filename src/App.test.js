import {render, screen} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import App from './App'

test('renders Home page correctly', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  )

  expect(screen.getByText(/IPL Dashboard/i)).toBeInTheDocument()
})

test('renders NotFound for invalid route', () => {
  render(
    <MemoryRouter initialEntries={['/invalid']}>
      <App />
    </MemoryRouter>
  )

  expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument()
})
