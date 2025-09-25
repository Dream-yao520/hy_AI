import {
    useState,
    useEffect,
    useRef
} from 'react'

function useRequest(service) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    const serviceRef = useRef(service)

    useEffect(() => {
        serviceRef.current = service
    }, [service])

    const run = async (...args) => {
        setLoading(true)
        setError(null)
        try {
            const res = await serviceRef.current(...args)
            setData(res)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => [
        run()
    ], [])

    return {
        loading,
        data,
        error,
        run
    }
}

export default useRequest
