import { screen } from '@testing-library/react'
import { renderWithProviders } from '~/utils/test'
import { LoginForm } from './index'

describe('LoginForm', () => {
  it('renders email input', () => {
    renderWithProviders(<LoginForm />)

    const emailInput = screen.getByPlaceholderText(/email/i)
    expect(emailInput).toBeInTheDocument()
  })

  it('renders password input', () => {
    renderWithProviders(<LoginForm />)

    const passwordInput = screen.getByPlaceholderText(/password/i)
    expect(passwordInput).toBeInTheDocument()
  })
})
