import { TodoContext } from '../TodoContexts'
import { useContext } from 'react'

export function useTodoContext() {
    return useContext(TodoContext)
}