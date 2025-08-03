import { useRef } from 'react';
import { useLoginStore } from '@/store/useLoginStore';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';

const Login = () => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const { login } = useLoginStore();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;

        if (!username || !password) {
            alert('请输入用户名和密码');
            return;
        }

        login({ username, password })
            .then(() => {
                setTimeout(() => {
                    navigate(-1);
                }, 1000);
            })
            .catch(err => {
                alert(err.message || '登录失败');
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