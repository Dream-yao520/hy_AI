import { useRef, useEffect } from 'react'

export default function useIntersectionObserver(callback, options = {}) {
    const ref = useRef(null)

    useEffect(() => {
        // 确保callback是函数
        if (typeof callback !== 'function') {
            console.error('useIntersectionObserver: callback must be a function')
            return
        }

        // 创建观察者
        const observer = new IntersectionObserver(([entry], obs) => {
            if (entry.isIntersecting) {
                callback(entry, obs)
                // 如果配置了once为true，则只观察一次
                if (options.once) {
                    obs.unobserve(entry.target)
                }
            }
        }, options)

        // 开始观察
        if (ref.current) {
            observer.observe(ref.current)
        }

        // 组件卸载时清理
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
            observer.disconnect()
        }
    }, [callback, options])

    return ref
}