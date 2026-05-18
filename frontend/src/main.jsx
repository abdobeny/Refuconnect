import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import { AnimalsProvider } from './context/AnimalsContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AnimalsProvider>
        <App />
      </AnimalsProvider>
    </AuthProvider>
  </StrictMode>,
)
