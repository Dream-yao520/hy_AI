import {
    useState,
    useEffect,
    useRef
} from 'react'

function useAsyncEffect(asyncFn, deps) {
    const [value, setValue] = useState({
        loading: false,
        data: undefined,
        error: undefined
    })

    const isMounted = useRef(true)

    useEffect(() => {
        isMounted.current = true
        setValue({
            loading: true,
            data: undefined,
            error: undefined
        })

        asyncFn().then((value) => {
            if (isMounted.current) {
                setValue({
                    loading: false,
                    data: value,
                    error: undefined
                })
            }
        }).catch((error) => {
            if (isMounted.current) {
                setValue({
                    loading: false,
                    data: undefined,
                    error: error
                })
            }
        })
        return () => {
            isMounted.current = false
        }
    }, deps)
    return (
        value
    )

}

export default useAsyncEffect

