// 封装 调用
// callback delay
// useEffect remove

import {
    useEffect,
    useRef
} from 'react'

function useInterval(callback, delay) {
    // 可改变对象
    const saveCallback = useRef()

    useEffect(() => {
        // 每次调用都更新最新的回调函数
        saveCallback.current = callback
    }, [callback])

    // 添加定时器
    // 移除定时器
    useEffect(() => {
        if (!delay) return
        const tick = () => saveCallback.current()
        const id = setInterval(tick, delay)
        return () => {
            clearInterval(id)
        }
    }, [delay])
}

export default useInterval
