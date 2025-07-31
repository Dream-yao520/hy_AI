import styles from './toast.module.css';
import { useState, useEffect } from 'react';
import { toastEvent } from './toastController';

const Toast = (props) => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({
        user: 0,
        bell: 0,
        mail: 0
    });
    useEffect(() => {
        const show = (info) => {
            setData(info);
            setVisible(true);
            setTimeout(() => {
                setVisible(false);
            }, 3000);
        }
        // 自定义事件 show是自定义事件的名字
        // on 监听一个事件
        // 订阅了show的事件，订阅者
        toastEvent.on('show', show);
        // 组件销毁时，取消订阅
        return () => {
            toastEvent.off('show', show);
        }
    }, []);
    // 等着通信的到来
    // 事件机制 
    if (!visible) {
        return null;
    }
    return (
        <>
            <div className={styles.toastWrapper}>
                <div className={styles.toastItem}>👤 {data.user}</div>
                <div className={styles.toastItem}>🔔 {data.bell}</div>
                <div className={styles.toastItem}>✉ {data.mail}</div>
                <div className={styles.toastArrow}></div>
            </div>
        </>
    )
}

export default Toast;
