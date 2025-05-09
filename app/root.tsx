import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '~/store'
import { Router } from '~/router'

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector<HTMLDivElement>('#app')

  if (element !== null) {
    createRoot(element).render(
      <StrictMode>
        <Provider store={store}>
          <Router />
        </Provider>
      </StrictMode>
    )
  }
})
