import axios from './config'

export const getUser = () => {
    return axios.get('/user')
}

export const doLogin = (data) => {
    return axios.post('/login', data)
}

// export const getUserArticles = async () => {
//     return await axios.get('/user')
// }