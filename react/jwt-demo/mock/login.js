// login 模块 mock
export default [
    {
        url: '/api/login',
        method: 'post',
        timeout: 2000,//手动指定请求耗时
        response: (req, res) => {
            // req,username,password
            const { username, password } = req.body
            return {
                username,
                password
            }
        },
    }
]