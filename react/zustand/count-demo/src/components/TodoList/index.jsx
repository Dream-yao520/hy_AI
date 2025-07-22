import { useTodosStore } from '../../store/todos'


const TodoList = () => {
    const {
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
    } = useTodosStore()
    return (
        <>
            <h1>todoList</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                    </li>
                ))}
            </ul>

        </>
    )
}

export default TodoList