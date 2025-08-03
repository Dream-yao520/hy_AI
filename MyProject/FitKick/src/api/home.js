import axios from './config'

// 导入环境变量中的Unsplash API Key
const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY

export const getImages = (page, tab) => {
    // 首先尝试调用Unsplash API
    return axios.get('https://api.unsplash.com/photos/random', {
        params: {
            client_id: UNSPLASH_API_KEY,
            count: 10, // 每次请求10张图片
            page: page || 1,
            orientation: 'portrait', // 优先获取纵向图片
            query: tab // 搜索与标签相关的图片
        }
    })
        .then(response => {
            // 处理响应数据，生成符合项目需求的格式
            return {
                code: 0,
                data: response.map((item) => ({
                    id: `${tab}-${page}-${item.id}`,
                    height: Math.floor(Math.random() * 300) + 300, // 随机高度300-600
                    url: item.urls.regular
                }))
            }
        })
        .catch(error => {
            // console.error('获取Unsplash图片失败，使用备用mock数据:', error)
            // 失败时，调用原来的接口获取mock数据
            return axios.get('/images', {
                params: {
                    page,
                    tab
                }
            })
        })
}