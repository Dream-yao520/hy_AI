import {
  Suspense,
  lazy
} from 'react'
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import './App.css'
import Toast from '@/components/Toast'

const Loading = lazy(() => import('@/components/Loading'))
const MainLayout = lazy(() => import('@/components/MainLayout'))
const BlankLayout = lazy(() => import('@/components/BlankLayout'))
const Home = lazy(() => import('@/pages/Home'))
const UserProfile = lazy(() => import('@/pages/UserProfile'))
const ProductList = lazy(() => import('@/pages/ProductList'))
const Like = lazy(() => import('@/pages/Like'))
const Search = lazy(() => import('@/pages/Search'))
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))
const Login = lazy(() => import('@/pages/Login'))
const Chat = lazy(() => import('@/pages/Chat'))
const RequireAuth = lazy(() => import('@/components/RequireAuth'))
const Coze = lazy(() => import('@/pages/Coze'))

function App() {

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/like" element={<RequireAuth><Like /></RequireAuth>} /> //requireAuth
          <Route path="/chat" element={<RequireAuth><Chat /></RequireAuth>} />//requireAuth
        </Route>
        {/* 空的Layout */}
        <Route path="/" element={<BlankLayout />}>
          <Route path="/search" element={<Search />} />
          <Route path="/detail/:id" element={<RequireAuth><ProductDetail /></RequireAuth>} />//requireAuth
          <Route path="/login" element={<Login />} />
          <Route path="/coze" element={<Coze />} />
        </Route>
      </Routes>
      <Toast />
    </Suspense>
  )
}

export default App
