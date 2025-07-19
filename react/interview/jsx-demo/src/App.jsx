import { useState, createElement } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: '学习React' },
    { id: 2, title: '完成项目' },
    { id: 3, title: '参与社区活动' },
  ])
  const element = <h1 className='title'>Hello,World</h1>
  const element2 = createElement('h1', { className: 'title', id: 'title' }, 'Hello,React')

  return (
    <>
      {element}
      {element2}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <ul>
        {
          todos.map(todo => createElement('li', { key: todo.id }, todo.title))
        }
      </ul>
    </>
  )
}

export default App
