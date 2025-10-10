import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link
} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import KeepAlive from './KeepAlive'

function RouterWithKeepAlive() {
  const location = useLocation()

  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <KeepAlive active={location.pathname === '/'}>
        <Home />
      </KeepAlive>
      {location.pathname === '/about' && (
        <About />
      )}
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <RouterWithKeepAlive />
    </Router>
  )
}