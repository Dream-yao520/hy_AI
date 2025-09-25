// 拿到上一次状态的值
import {
    useRef,
    useEffect
} from 'react'

function usePrevious(value) {
    const ref = useRef()

    useEffect(() => {
        ref.current = value
        return () => {
            ref.current = null
        }
    }, [value])
    return ref.current
}
export default usePrevious


