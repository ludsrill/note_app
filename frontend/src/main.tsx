import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/Authcontext.tsx'

const rootElement = document.getElementById('root')

if (rootElement == null) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <AuthProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AuthProvider>

)
