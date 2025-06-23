import { screen } from '@testing-library/react'
import { renderWithProviders } from '~/utils/test'
import { PasswordFormBody } from './PasswordFormBody'

describe('PasswordFormBody', () => {
  it('renders current password input', () => {
    renderWithProviders(<PasswordFormBody />)

    const emailInput = screen.getByPlaceholderText(/current password/i)
    expect(emailInput).toBeInTheDocument()
  })

  it('renders new password input', () => {
    renderWithProviders(<PasswordFormBody />)

    const passwordInput = screen.getByPlaceholderText(/new password/i)
    expect(passwordInput).toBeInTheDocument()
  })
})
