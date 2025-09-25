import {
    useEffect,
    useRef
} from 'react'

function useInterval(fn, delay) {
    const fnRef = useRef(fn)
    const timerRef = useRef()

    useEffect(() => {
        fnRef.current = fn
    }, [fn])

    useEffect(() => {
        if (typeof delay !== 'number' || delay < 0 || isNaN(delay)) {
            return
        }
        timerRef.current = setInterval(() => {
            fnRef.current()
        }, delay)

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
            timerRef.current = null
        }
    }, [delay])

    const clear = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }
    }
    return {
        clear
    }
}

export default useInterval


