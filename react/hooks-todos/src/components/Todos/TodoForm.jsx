import { useState } from 'react' //私有状态

const TodoForm = ({ onAddTodo }) => {
    // 数据
    // props 参数数据
    // state 私有的数据
    // 单项数据流
    const [text, setText] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        let result = text.trim() // dry dont repeat yourself
        if (!result) return;
        onAddTodo(result)
        setText('')//用户体验 对数据状态和界面状态一致要敏感
    }
    return (
        // JSX 一定要有唯一的最外层元素 树来编译解析JSX，
        <>
            <h1 className="header">TodoList</h1>
            <form className='todo-input' onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={text} // 数据绑定
                    onChange={(e) => setText(e.target.value)}//维护数据值和input 同步 
                    placeholder='Todo text'
                    required
                />
                <button type='submit'>Add</button>
            </form>
        </>
    )
}

export default TodoForm
