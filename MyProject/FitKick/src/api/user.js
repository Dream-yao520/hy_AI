import axios from './config'

export const getUser = () => {
    return axios.get('/user')
}

export const doLogin = (data) => {
    return axios.post('/login', data)
}

export const doRegister = (data) => {
    return axios.post('/register', data)
}