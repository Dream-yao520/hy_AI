import jwt from "jsonwebtoken";
// 安全性 编码的时候用于加密
// 解码的时候用于解密
const secret = '!&05152054.'

// login 模块 mock
export default [
    {
        url: '/api/login',
        method: 'post',
        timeout: 2000,//手动指定请求耗时
        response: (req, res) => {
            // req,username,password
            const { username, password } = req.body
            if (username !== 'admin' || password !== '123456') {
                return {
                    code: 1,
                    message: '用户名或密码错误',
                }
            }
            // JSON 用户数据对象
            const token = jwt.sign({
                user: {
                    id: "001",
                    username: "admin",
                }
            }, secret, {
                expiresIn: '24h',
            })
            // console.log(token, '///')

            // 生成token 颁发令牌
            return {
                token,
                username,
                password
            }
        },
    },
    {
        url: '/api/user',
        method: 'get',
        response: (req, res) => {
            // 用户端 token headers
            const token = req.headers["authorization"]
            try {
                const decode = jwt.decode(token, secret)
                console.log(decode)
                return {
                    code: 0,
                    data: decode.user
                }
            } catch (err) {
                return {
                    code: 1,
                    message: 'Invalid token'
                }
            }
            return {
                token
            }
        }
    }
]