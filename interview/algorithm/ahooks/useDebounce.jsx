import {
    useEffect,
    useState
} from 'react'


function useDebounce(value, delay = 300) {
    const [value, setValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setValue(value)
        }, delay)
        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return value
}

export default useDebounce


import {
    useState,
    useEffect
} from 'react'

