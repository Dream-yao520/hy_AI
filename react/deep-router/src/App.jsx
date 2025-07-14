import { useState, Suspense, lazy } from 'react'//lazy react里用于懒加载
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
// 函数  路由->Route
// 返回一个新的组件
// 所有页面级组件都应该被懒加载
import Navigation from './components/Navigation'
import ProtectRoute from './components/ProtectRoute'
import Pay from './Pages/Pay'
const Login = lazy(() => import('./Pages/Login'))
const Home = lazy(() => import('./Pages/Home'))
const About = lazy(() => import('./Pages/About'))
const NotFound = lazy(() => import('./Pages/NotFound'))

// import About from './pages/About'
// 30几个页面

function App() {

  return (
    <>
      <Router>
        <Navigation />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            {/* 校验权限 */}
            <Route path='/pay' element={<ProtectRoute>
              {/* <Pay /> */}
              <div>1233</div>
              <div>1233</div>
            </ProtectRoute>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App
