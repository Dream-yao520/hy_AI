import {
    useEffect
} from 'react'

function useTitle(title) {
    // 组件加载完成后，设置标题
    // useEffect(() => {
    document.title = title
    // }, [])
}

export default useTitle