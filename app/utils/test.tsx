import { type ReactElement } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { render, type RenderResult } from '@testing-library/react'
import { makeStore } from '~/store'

export function renderWithProviders(ui: ReactElement): RenderResult {
  const store = makeStore()

  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  )
}
