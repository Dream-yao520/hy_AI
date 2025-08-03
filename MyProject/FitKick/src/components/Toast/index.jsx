import styles from './toast.module.css'
import { useToastStore } from '@/store/useToastStore'

// Toast组件
const Toast = () => {
    const { toast, closeToast } = useToastStore()

    // 根据类型设置样式类名
    const getTypeClass = () => {
        if (!toast) return ''
        switch (toast.type) {
            case 'success':
                return styles.success
            case 'error':
                return styles.error
            case 'warning':
                return styles.warning
            default:
                return styles.info
        }
    }

    // 点击Toast可以关闭
    const handleClick = () => {
        closeToast()
    }

    if (!toast) return null

    return (
        <div
            className={`${styles.toast} ${getTypeClass()}`}
            onClick={handleClick}
        >
            <p>{toast.message}</p>
        </div>
    )
}

// 导出Toast组件和showToast方法
export { Toast }

export default Toast