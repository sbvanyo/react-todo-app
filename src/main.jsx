import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Hooks up index.html with React code ('root' is the div in index.html where our React code is rendered)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
