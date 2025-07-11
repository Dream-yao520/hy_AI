import {
  useState,
  useLayoutEffect,
  useEffect,
  useRef
} from 'react'
import './App.css'

// function App() {
//   // 响应式对象
//   const boxRef = useRef()
//   console.log(boxRef.current, boxRef)

//   useEffect(() => {
//     console.log('useEffect height', boxRef.current.offsetHeight)
//   }, [])

//   useLayoutEffect(() => {
//     console.log('useLayoutEffect height', boxRef.current.offsetHeight)
//   }, [])
//   return (
//     <>
//       <div ref={boxRef} style={{ height: 100 }}></div>
//     </>
//   )
// }
// function App() {
//   const [content, setContent] = useState(`函数式编程旨在尽可能的提高代码的无状态性和不变性。要做到这一点，就要学会使用无副作用的函数，也就是纯函数

// 纯函数是对给定的输入返还相同输出的函数，并且要求你所有的数据都是不可变的，即纯函数=无状态+数据不可变`)
//   const ref = useRef()
//   //   useEffect(() => {
//   //     setContent(`在我们的编程世界中，我们需要处理的其实也只有“数据”和“关系”，而关系就是函数

//   // 编程工作也就是在找一种映射关系，一旦关系找到了，问题就解决了，剩下的事情，就是让数据流过这种关系，然后转换成另一个数据，如下图所示

//   // `)
//   //     ref.current.style.height = '200px'
//   //   }, [])
//   useLayoutEffect(() => {
//     //阻塞渲染，同步的感觉
//     setContent(`在我们的编程世界中，我们需要处理的其实也只有“数据”和“关系”，而关系就是函数

// 编程工作也就是在找一种映射关系，一旦关系找到了，问题就解决了，剩下的事情，就是让数据流过这种关系，然后转换成另一个数据，如下图所示

// `)
//     ref.current.style.height = '200px'
//   }, [])
//   return (
//     <>
//       <div ref={ref} style={{ height: 50, background: 'lightblue' }}>{content}</div>
//     </>
//   )
// }
//弹窗
function Modal() {
  const ref = useRef()
  useLayoutEffect(() => {
    const height = ref.current.offsetHeight
    ref.current.style.marginTop = `${(window.innerHeight - height) / 2}px`
    ref.current.style.marginLeft = `${(window.innerWidth - ref.current.offsetWidth) / 2}px`
  }, [])
  return <div ref={ref} style={{ position: 'absolute', height: '200px', width: '200px', background: 'red' }}>
    我是弹窗
  </div>
}

function App() {
  return (
    <>
      <Modal />
    </>
  )
}
export default App
