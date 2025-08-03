import {
    create
} from 'zustand'
import {
    doLogin,
} from '@/api/user'

export const useLoginStore = create((set) => ({
    user: null, // 用户信息
    isLogin: false, // 是否登录
    login: async ({ username = "", password = "" }) => {
        const data = await doLogin({ username, password })
        // console.log(data)
        const { token, data: user } = data
        // console.log(token, user);
        localStorage.setItem('token', token)
        set({
            isLogin: true,
            user,
        })
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