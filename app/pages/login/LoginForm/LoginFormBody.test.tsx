import { screen } from '@testing-library/react'
import { renderWithProviders } from '~/utils/test'
import { LoginFormBody } from './LoginFormBody'

describe('LoginFormBody', () => {
  it('renders email input', () => {
    renderWithProviders(<LoginFormBody />)

    const emailInput = screen.getByPlaceholderText(/email/i)
    expect(emailInput).toBeInTheDocument()
  })

  it('renders password input', () => {
    renderWithProviders(<LoginFormBody />)

    const passwordInput = screen.getByPlaceholderText(/password/i)
    expect(passwordInput).toBeInTheDocument()
  })
})
