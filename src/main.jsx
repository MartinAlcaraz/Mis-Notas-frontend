import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserContextProvider } from './context/UserContext.jsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <ThemeProvider>
          <App />
      </ThemeProvider>
    </UserContextProvider>
  </React.StrictMode>
)
