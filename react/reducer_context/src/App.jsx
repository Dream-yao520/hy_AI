import { useState } from 'react'
import './App.css'
import {
  TodoContext
} from './TodoContexts'
import { useTodos } from './hooks/useTodos'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'

function App() {
  const todosHook = useTodos()

  return (
    // APP 状态管理
    <TodoContext.Provider value={todosHook}>
      <h1>Todo APP</h1>
      <AddTodo />
      <TodoList />
    </TodoContext.Provider>
  )
}

export default App
