// 内置的hook 函数
import { useState } from 'react'
import '../Todo.css'
import TodoForm from './TodoForm';
import Todos from './Todos'
function TodoList() {
    //数据驱动的界面
    // 静态页面？
    //DOM 数据 -> map -> join('') -> innerHTML 底层API 编程
    //缺点：低效、面向API
    //面向业务 懂业务 
    //数据 -> 变化 -> 数据状态 -> 自动刷新页面 -> **数据**驱动的界面
    //返回一个数组 数组的第一个元素是数据变量 数组的第二个元素是一个函数，执行并传入新的todos 页面自动更新数据
    //挂载点 tbody
    //{todos.map}
    //setTodos  DOM 及动态更新
    //响应式界面开发
    //hi就是数据状态 setHi 修改数据状态的方法
    //es6 解构赋值
    const [hi, setHi] = useState('hello')
    const [title, setTitle] = useState('Todo list')
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: '吃饭',
            completed: false
        }
    ])
    const handleAdd = (text) => {
        setTodos([...todos, { id: todos.length + 1, text, completed: false }])
    }
    // setTimeout(() => {

    //     setTodos([...todos, { id: 2, text: '睡觉', completed: false }])
    //     //找到DOM，innerHTML 
    //     //更新业务 setTitle
    //     setTitle('Todo list 2')
    //     setHi('hi')
    // }, 3000)
    return (
        <div className='container'>
            <h1 className='title'>{title} {hi}</h1>
            {/* 表单 */}
            <TodoForm onAdd={handleAdd} />
            {/* 列表 */}
            <Todos todos={todos} />
            {
                //当下这个位置
                //数据为王 界面是被驱动的
                //数据驱动
                //数据绑定 data-bind 双向绑定
                //发生改变之后 自动的改变
                // todos.map(todo => (
                //     <li>{todo.text}</li>
                // ))
            }
        </div>
    );
}
export default TodoList