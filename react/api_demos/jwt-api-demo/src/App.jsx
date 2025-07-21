import {
  useState,
  useEffect
} from 'react'
import './App.css'
import {
  getTodos,
  getRepos,
} from '@/api'

function App() {
  // const [todos, setTodos] = useState([])
  const [repos, setRepos] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      // const todosResult = await getTodos()
      // console.log('todosResult', todosResult.data.data)
      // setTodos(todosResult.data.data)
      const reposResult = await getRepos()
      console.log('reposResult', reposResult.data)
      setRepos(reposResult.data)
    }
    fetchData()
  }, [])

  return (
    <>
      {/* <div>
        <h1>Todos</h1>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div> */}
      <div>
        <h1>Repos</h1>
        {repos.map(repo => (
          <div key={repo.id}>
            <h2>{repo.title}</h2>
            <p>{repo.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
