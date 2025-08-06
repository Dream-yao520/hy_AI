import axios from 'axios'

// 修改前
axios.defaults.baseURL = 'http://localhost:5173/api'

// 修改后
// 生产环境使用相对路径，开发环境使用本地地址
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5173/api'

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || ""
    // if (token) {
    // console.log('/////');
    if (token && !config.url.includes('/pexels')) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
// 响应拦截
axios.interceptors.response.use((data) => {
    return data.data
})

export default axios

