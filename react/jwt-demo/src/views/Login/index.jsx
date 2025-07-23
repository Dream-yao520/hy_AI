import {
    useRef
} from 'react'
import {
    useUserStore
} from '../../store/user'
import {
    useNavigate
} from 'react-router-dom'
const Login = () => {
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const { login } = useUserStore()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const username = usernameRef.current.value
        const password = passwordRef.current.value
        if (!username || !password) {
            alert('请输入用户名和密码')
            return
        }
        login({ username, password })
            .then(res => {
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            }).catch(err => {
                alert(err.message)
            })
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" ref={usernameRef} type="text" required placeholder="请输入用户名" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" ref={passwordRef} type="password" required placeholder="请输入密码" />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </>
    )
}

export default Login