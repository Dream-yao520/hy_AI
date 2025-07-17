import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import {
  // BrowserRouter as Router, //history 路由
  HashRouter as Router,//hash 路由
  Routes,
  Route,
  Link
} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to='/'>首页</Link>
            </li>
            <li>
              <Link to='/about'>关于</Link>
            </li>
          </ul>
        </nav >
        <main>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
            </Routes>
          </div>
        </main>
      </Router>
    </>
  )
}

export default App
