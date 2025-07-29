import { useState } from 'react'
import './App.css'
import NameEditComponent from './components/NameEditComponent'

function App() {
  // js 代码
  // const [name, setName] = useState('initialName')
  // ts 代码
  const [name, setName] = useState<string>('initialName');
  // 单项数据流
  const setUsernameState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  return (
    <>
      <NameEditComponent username={name} onChange={setUsernameState} />
    </>
  )
}

export default App
