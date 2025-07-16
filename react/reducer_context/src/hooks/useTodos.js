import {
    useReducer,

} from 'react'
import todoReducer from '../reducers/todoReducer'
// es6参数的默认值
// {todos}//key和value一样的时候可以省略
// `` 模板字符串
// 解构 []=[] {}={}
// 展开运算符，...  rest 运算符
export function useTodos(initial = []) {
    const [todos, dispatch] = useReducer(todoReducer, initial)
    const addTodo = (text) => {
        dispatch({
            type: 'ADD_TODO',
            text,
        })
    }
    const toggleTodo = (id) => {
        dispatch({
            type: 'TOGGLE_TODO',
            id,
        })
    }
    const removeTodo = (id) => {
        dispatch({
            type: 'REMOVE_TODO',
            id,
        })
    }
    return {
        todos,
        addTodo,
        toggleTodo,
        removeTodo,
    }
}