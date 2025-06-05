// // // 页面加载完成后执行
// // window.addEventListener('DOMContentLoaded', () => {
// //     console.log('WebLLM项目已加载');
// //     // 可以在此添加更多交互逻辑
// // });
// //js 主动去拉取http 接口
// //web 1.0时代 html/css/js 服务器端java返回的 js只做简单的交互
// //web 2.0时代 js 可以主动的请求后端服务器 动态页面
// fetch('https://api.github.com/users/Dream-yao520/repos')
//     .then(response => response.json())
//     .then(data => {
//         // 处理数据
//         // console.log(data);
//         document.querySelector('#reply').innerHTML += data.map(repo => `
//         <ul>
//             <li>${repo.name}</li>
//         <ul/>
//         ` ).join('')
//     })
// 当LLM API 服务
//chat 方式 AIGC 生成/完成 返回的内容
//由openai 制定
//请求行
//命名
//webLLM web 底层是 http协议
//llm api 服务
// api.deepseek.com 二级域名 LLM服务以api的方式提供
//https 加密的http 更安全
// /chat 聊天的方式 messages
const endpoint = 'https://api.deepseek.com/chat/completions'
//请求头
const headers = {
    //内容类型
    'Content-Type': 'application/json',
    //授权
    'Authorization': 'Bearer sk-3b64a13582884576ba1ca05c8f0ae0c3'
}
//请求体
const payload = {
    model: 'deepseek-chat',
    messages: [
        //chat 三种方式
        //系统角色 只会出现一次 设置系统的角色 开始会话时
        //用户角色 user 提问
        //助手角色
        {
            role: 'system',
            content: 'You are a helpful assistant.'
        },
        {
            role: 'user',
            content: '你好,DeepSeek'
        }
    ]
}
fetch(endpoint, {
    method: 'POST',
    headers: headers,
    //http 请求传输只能是字符串，二进制流
    body: JSON.stringify(payload)
    //请求 + LLM 生成需要花时间
    //http 是基于请求响应的简单协议，
    //返回的也是文本或二进制流
}).then(res => res.json())
    //解析返回的json 数据 也要花时间
    .then(data => {
        console.log(data);
        document.querySelector('#reply').innerHTML = data.choices[0].message.content
    })