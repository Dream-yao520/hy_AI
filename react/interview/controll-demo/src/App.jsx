import { useState, useRef } from 'react'
import './App.css'

function ControlledInput({ onSubmit }) {
  const [value, setValue] = useState('')//响应式状态
  const [error, setError] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(value)
    onSubmit(value)
  }
  const handleChange = (e) => {
    setValue(e.target.value)
    //频繁触发 实时判断表单是否合格
    if (e.target.value.length < 6) {
      setError('请输入6个字符以上')
    } else {
      setError('')
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="controll-input">受控组件</label>
      <input
        type="text"
        id="controll-input"
        value={value}
        onChange={handleChange}
        required
      />
      {error && <p>{error}</p>}
      <input type="submit" value="提交" />
    </form>
  )
}

function UnControlledInput({ onSubmit }) {
  const inputRef = useRef(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputRef.current.value)
    onSubmit(inputRef.current.value)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="uncontroll-input">非受控组件</label>
      <input
        type="text"
        id="uncontroll-input"
        ref={inputRef}

      />
      <input type="submit" value="提交" />
    </form>
  )
}

function App() {
  const handleSubmit = (value) => {
    console.log(value)
  }
  return (
    <>
      <ControlledInput onSubmit={handleSubmit} />
      <UnControlledInput onSubmit={handleSubmit} />
    </>
  )
}

export default App
