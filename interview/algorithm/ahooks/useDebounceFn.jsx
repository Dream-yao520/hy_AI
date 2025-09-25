import {
    useCallback,
    useRef
} from 'react'

function useDebounceFn(callback, delay) {
    const timerRef = useRef(null)

    const run = useCallback((...args) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }
        timerRef.current = setTimeout(() => {
            callback.apply(this, args)
        }, delay)
    }, [callback, delay])

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [])
    return { run }
}

export default useDebounceFn

