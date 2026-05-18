import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import { AnimalsProvider } from './context/AnimalsContext'
import './index.css'
import App from './App.jsx'

function renderApp() {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <AuthProvider>
        <AnimalsProvider>
          <App />
        </AnimalsProvider>
      </AuthProvider>
    </StrictMode>,
  )
}

const useMsw = import.meta.env.VITE_USE_MSW === 'true'

if (import.meta.env.DEV && useMsw) {
  import('./mocks/browser').then(({ worker }) => {
    worker.start({ onUnhandledRequest: 'bypass' }).then(renderApp)
  }).catch((err) => {
    console.error('MSW failed to start', err)
    renderApp()
  })
} else {
  renderApp()
}
