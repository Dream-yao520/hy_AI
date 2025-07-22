import { useState, useEffect, useCallback, useMemo } from 'react' // useMemo 缓存一个复杂计算的值
import './App.css'
import Button from './components/Button'

function App() {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(0)
  console.log('APP render');

  // 复杂计算开销高
  const expensiveComputation = () => {
    console.log('expensiveComputation')
    for (let i = 0; i < 1000000; i++) {
      i++
    }
    return count * 2
  }
  const result = useMemo(() => expensiveComputation(count), [count])
  useEffect(() => {
    console.log('count', count)
  }, [count])
  useEffect(() => {
    console.log('num', num)
  }, [num])
  // rerender 重新生成
  // 不要重新生成，和useEffect []一样
  // callback 回调函数 缓存
  const handleClick = useCallback(() => {
    console.log('handleClick')
  }, [num])
  return (
    <>
      {/* <div>{expensiveComputation(count)}</div> */}
      <div>{result}</div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>增加count</button>
      <br />
      <button onClick={() => setNum(num + 1)}>增加num</button>
      <Button num={num} onClick={handleClick}>Click Me</Button>
    </>
  )
}

export default App
