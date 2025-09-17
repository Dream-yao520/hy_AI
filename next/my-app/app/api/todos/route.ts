import {
    NextResponse // res
} from 'next/server' // api server 
import { type Todo } from '@/app/types/todo';

// ts 是js的超集

let todos: Todo[] = [
    {
        id: 1,
        text: '学习ts',
        completed: false,
    },
    {
        id: 2,
        text: '学习next',
        completed: false,
    },

];

// Restful 一切皆资源
// 后端就是用来向后端暴露资源的
// method + 资源 URL定义规则
export async function GET() {
    return NextResponse.json(todos);

}

export async function POST(request: Request) {
    // 获取请求体 body json
    const data = await request.json();
    // 核心的数据，函数的参数，返回值
    const newTodo: Todo = {
        id: + Date.now(),
        text: data.text,
        // typeScript 除了强类型之外，代码提示更好，写起来更快
        completed: false,
    }
    todos.push(newTodo);
    return NextResponse.json(newTodo);

}

export async function PUT(request: Request) {
    const data = await request.json(); // 请求体
    todos = todos.map(todo => {
        if (todo.id === data.id) {
            return {
                ...todo,
                ...data,
                completed: !todo.completed,
            }
        }
        return todo;
    })
    return NextResponse.json(todos);
}

// restful 简历
export async function DELETE(request: Request) {
    const data = await request.json(); // 请求体
    todos = todos.filter(todo => todo.id !== data.id);
    return NextResponse.json(todos);
}
