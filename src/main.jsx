import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
// import SplashCursor from './components/SplashCursor'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <SplashCursor /> */}
  </StrictMode>,
)
