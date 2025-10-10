import {
    useEffect,
    useRef,
} from 'react'
import ReactDOM from 'react-dom'

export default function KeepAlive({ active, children }) {
    const containerRef = useRef(null) // 缓存容器dom
    const contentRef = useRef(null)

    useEffect(() => {
        // 挂载
        if (!containerRef.current) {
            containerRef.current = document.createElement('div')
            containerRef.current.appendChild(contentRef.current)
            ReactDOM.render(children, contentRef.current)
        }
        return () => {
            containerRef.current.style.display = 'none'
        }
    }, [])

    useEffect(() => {
        // 激活
        if (containerRef.current) {
            if (active) {
                containerRef.current.style.display = 'block'
            } else {
                containerRef.current.style.display = 'none'
            }
        }
    }, [])

    return <div ref={containerRef} />
}