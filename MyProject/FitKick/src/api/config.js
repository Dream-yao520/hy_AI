import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5173/api'

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || ""
    // if (token) {
    // console.log('/////');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
// 响应拦截
axios.interceptors.response.use((data) => {
    return data.data
})

export default axios

