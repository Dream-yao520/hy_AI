import { useState } from 'react'
import './App.css'
//todos 列表需要渲染
//函数组件 App 组件 组合其他的组件完成应用
//返回html的函数 
//html css js 用函数组合在一起，就是一个组件
// function App() {
//   //react 比 vue 更纯粹
//   const todos = ['吃饭', '睡觉', '打豆豆'] //数组->数据
//   return (
//     <>
//       <table>
//         <thead>
//           <tr>
//             <th>序号</th>
//             <th>任务</th>
//           </tr>
//         </thead>
//         <tbody>
//           {
//             //动态
//             //vue两个{}react一个{} 
//             //js DOM 编程API
//             //在html里面写js代码用{}里面写js代码
//           todos.map((item, index) => (
//             <tr>
//               <td>{index + 1}</td>
//               <td>{item}</td>
//             </tr>

//           ))
//           }
//         </tbody>
//       </table>
//     </>
//   )
// }
function App() {
  //数据 -> 数据状态 数据业务 改变的 数据状态
  const [todos, setTodos] = useState(['吃饭', '睡觉', '打豆豆'])
  const [title, setTitle] = useState('ECUT 凯子')

  setTimeout(() => {
    // setTodos(['吃饭', '睡觉', '打豆豆', '学习'])
    setTitle('字节 凯子')
  }, 5000);
  return (
    <div>
      <h1 className="title">{title}</h1>
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>任务</th>
          </tr>
        </thead>
        <tbody>
          {//html模板
            todos.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
