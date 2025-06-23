import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '~/store'
import { App } from '~/app'

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector<HTMLDivElement>('#app')

  const isDevelopment = import.meta.env.MODE === 'development'

  if (element !== null) {
    createRoot(element).render(
      <Provider store={store}>
        {isDevelopment ? (
          <App />
        ) : (
          <StrictMode>
            <App />
          </StrictMode>
        )}
      </Provider>
    )
  }
})
