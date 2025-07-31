// search 模块
import axios from '@/api/config'

export const getSuggestList = async (keyword) => {
    return await axios.get(`/search?keyword=${keyword}`)
}

export const getHotList = async () => {
    return await axios.get('/hotlist')
}