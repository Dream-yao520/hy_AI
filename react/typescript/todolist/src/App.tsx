import './App.css'
import HelloComponent from './components/HelloComponent.tsx'
// typescript + react
// javascript 可能会有些问题，主要因为弱类型
// jsx 后缀变成 tsx
// 如何对函数进行类型约束
// const HelloComponent = () => {
//   // void 空 ReactNode
//   return <h1>hello ts</h1>
// }

function App() {
  // 编译阶段
  // 多了类型声明文件
  // 多写一些代码 类型声明 代码质量保驾护航 
  let count: number = 10
  const title: string = 'hello ts'
  const isDone: boolean = true
  const list: (number | string)[] = [1, '2', 3]
  // 元组类型
  const tuple: [number, string] = [1, '2']
  // 枚举类型
  enum Status {
    Pending,
    Fulfilled,
    Rejected
  }
  const pStatus: Status = Status.Pending
  // 对象的约束？
  // 接口类的定义
  interface User {
    name: string;
    age: number;
    sex: '男' | '女';
    isSingle?: boolean;
  }
  const user: User = {
    name: '张三',
    age: 18,
    sex: '男',
    isSingle: true
  }
  return (
    <>
      {count}
      {title}
      {user.name}{user.age}
      {/* typescript 很严格 */}
      <HelloComponent name='yao' />
    </>
  )
}

export default App
