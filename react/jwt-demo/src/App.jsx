import {
  useState,
  useEffect
} from 'react'
import './App.css'
import {
  getUser
} from './api/user'

function App() {
  useEffect(() => {
    (async () => {
      const res = await getUser()
      console.log(res);
    })()
  }, [])

  return (
    <>

    </>
  )
}

export default App
