import { useRef } from 'react';
import { useLoginStore } from '@/store/useLoginStore';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { useToastStore } from '@/store/useToastStore'

const Login = () => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const { login, user } = useLoginStore();
    const navigate = useNavigate();
    const { showToast } = useToastStore();
    const handleSubmit = (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (!username || !password) {
            showToast({
                message: '请输入用户名和密码',
                type: 'warning'
            });
            return;
        }

        login({ username, password })
            .then(() => {
                const nickname = user?.nickname || '海绵宝宝';
                showToast({
                    message: `欢迎你, ${nickname}`,
                    type: 'success'
                });
                setTimeout(() => {
                    navigate(-1);
                }, 1000);
            })
            .catch(err => {
                showToast({
                    message: err.message || '登录失败',
                    type: 'error'
                });
            });
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>FITKICK</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="username">用户名</label>
                    <input
                        id="username"
                        ref={usernameRef}
                        type="text"
                        required
                        placeholder="请输入用户名"
                        className={styles.input}
                        defaultValue="admin"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">密码</label>
                    <input
                        id="password"
                        ref={passwordRef}
                        type="password"
                        required
                        placeholder="请输入密码"
                        className={styles.input}
                        defaultValue="123456"
                    />
                </div>
                <div>
                    <button type="submit" className={styles.button}>
                        登录
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;