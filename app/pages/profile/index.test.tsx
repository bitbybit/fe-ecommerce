import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithRoutes } from '~/utils/test'
import { makeStore } from '~/store'
import { AUTH_STATUS } from '~/store/auth/types'
import { ROUTES } from '~/routes'

const notAuthenticatedStore = makeStore({
  auth: {
    customer: undefined,
    checkedAuth: true,
    errorMessage: '',
    status: AUTH_STATUS.READY
  }
})

describe('Profile page access', () => {
  it('redirects to login if not authenticated', async () => {
    renderWithRoutes([ROUTES.PROFILE], notAuthenticatedStore)
    expect(await screen.findByText(/password/i)).toBeInTheDocument()
  })
})
