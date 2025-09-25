// 只在依赖项变化的时候执行  useRef 记录一个值

import {
    useRef,
    useEffect
} from 'react'

function useUpdateEffect(callback, deps) {
    const firstRef = useRef(true)
    useEffect(() => {
        if (firstRef.current) {
            firstRef.current = false
            return
        }
        return callback()
    }, deps)
}
export default useUpdateEffect