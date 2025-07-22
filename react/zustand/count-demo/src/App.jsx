import { useState } from 'react'
import './App.css'
import Counter from './components/Counter/index.jsx'
import { useCountStore } from './store/count'
import TodoList from './components/TodoList/index.jsx'
import RepoList from './components/RepoList/index.jsx'

function App() {
  const { count } = useCountStore()
  return (
    <>
      App中的{count}
      <Counter />
      <TodoList />
      <RepoList />
    </>
  )
}

export default App
