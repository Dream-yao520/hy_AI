import { createRoot } from 'react-dom/client'
import 'lib-flexible'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)
