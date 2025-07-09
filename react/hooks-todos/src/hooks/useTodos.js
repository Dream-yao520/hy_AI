import {
    useState,
    useEffect
} from 'react'

export const useTodos = () => {
    const [todos, setTodos] = useState([
        ...JSON.parse(localStorage.getItem('todos') || '[]')
    ])
    // 新增todo 
    const addTodo = (text) => {
        // setTodo
        // 数据状态是对象的时候
        setTodos([
            ...todos,
            {
                id: Date.now(),
                text,
                isComplete: false
            }
        ])
    }

    const onToggle = (id) => {
        //todos 数组找到id 为id的元素，isComplete 取反
        // 响应式？ 返回一个全新的todos
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
            )
        );
    }

    const onDelete = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    return {
        todos,
        addTodo,
        onToggle,
        onDelete
    }
}

