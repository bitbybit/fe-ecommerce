import { Suspense, type ReactElement } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router'
import { render, type RenderResult } from '@testing-library/react'
import { RoutesProtected, RoutesPublic } from '~/app'
import { makeStore } from '~/store'
import { Loading } from '~/components/Loading'
import NotFound from '~/pages/NotFound'

export function renderWithProviders(ui: ReactElement, store = makeStore()): RenderResult {
  return renderWithStore(<MemoryRouter>{ui}</MemoryRouter>, store)
}

function renderWithStore(ui: ReactElement, store = makeStore()): RenderResult {
  return render(<Provider store={store}>{ui}</Provider>)
}

export function renderWithRoutes(initialEntries: string[], store = makeStore()): RenderResult {
  return renderWithStore(
    <MemoryRouter initialEntries={initialEntries}>
      <Suspense fallback={<Loading />}>
        <Routes>
          {RoutesPublic()}
          {RoutesProtected()}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </MemoryRouter>,
    store
  )
}
