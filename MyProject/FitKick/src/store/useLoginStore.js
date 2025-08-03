import {
    create
} from 'zustand'
import {
    doLogin,
    getUser
} from '@/api/user'

export const useLoginStore = create((set) => ({
    user: null, // 用户信息
    isLogin: localStorage.getItem('token') ? true : false, // 是否登录
    login: async ({ username = "", password = "" }) => {
        try {
            const data = await doLogin({ username, password })

            // 检查响应是否成功
            if (data.code !== 0) {
                throw new Error(data.message || '登录失败')
            }

            const { token, data: user } = data
            localStorage.setItem('token', token)
            // 登录成功后获取用户详细信息
            const userData = await getUser()
            if (userData.code === 0) {
                set({
                    isLogin: true,
                    user: userData.data,
                })
            } else {
                throw new Error('获取用户信息失败')
            }
        } catch (err) {
            console.error('登录失败:', err)
            throw err
        }
    },
    logout: () => {
        localStorage.removeItem('token')
        set({
            isLogin: false,
            user: null,
        })
    },
    setUser: (user) => set({ user }),
}))