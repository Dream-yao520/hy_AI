import { useState, lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'

const Home = lazy(() => import('./views/Home'))
const Login = lazy(() => import('./views/Login'))
const Product = lazy(() => import('./views/Product'))
const ShoopingCart = lazy(() => import('./views/ShoopingCart'))
const UserCenter = lazy(() => import('./views/UserCenter'))

function App() {


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/ShoopingCart" element={<ShoopingCart />} />
        <Route path="/UserCenter" element={<UserCenter />} />
      </Routes>
    </Suspense>
  )
}

export default App
