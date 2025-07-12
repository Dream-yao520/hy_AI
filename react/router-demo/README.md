# react-router-dom

- 路由？
    - 后端路由
        暴露资源
    - 前端路由
        - 首页
        - 列表页
        - 登录页...
        前端页面导航由前端路由负责
- react 开头
    react 生态系统的一部分
    - react
        响应式、状态管理、组件、hooks等核心功能
        - 体积大、笨重
        - 页面慢
        - 少就是多
    - react-router-dom
    - redux/mobx
    - axios
## react 开发全家桶
- react 19
- react-dom 19
- react-router-dom  7.6.3

## react 特色
- 全面组件化
    vue 更执着的地方
    react 函数化编程

- 动态路由
    https://juejin.cn/user/28815581516?a=1&b=2#hash
    path /users/:id  params
    # restful 国际规范
    url 定义是核心部分
    Method 资源的描述 
    GET /user/:id
    GET /post/:id 显示某篇文章
    POST /post 新增文章 
    PATCH /post/:id 修改文章
    DELETE /post/:id 删除文章
    HEAD /post/:id 查看资源的元信息
    PUT(替换) PATCH(部分) 修改
    上传头像 PUT /avatar/:id
    - 后端路由暴露资源
     
- 前端路由
- 后端路由
    早期只有后端路由
    server->http->路由(后端)->响应html网页-> 传统后端驱动的web开发方式 
    展示下一个页面 再来一个请求
    /
    /about 
    - 好处是足够简单
    - 缺点前后端耦合 后端要写前端的页面
    - 浪费沟通时间 
    - 逻辑，数据库，套页面 MVC 开发方式 Model(数据)View(视图)Controller(控制器)
    - 后端路由不再以返回界面为主
    - /api/user/:id 接口返回JSON 数据

- 前后端分离 MVVM Model(fetch api) View(JSX) viewModel(视图模型层 useState,数据绑定JSX)
    - 前后端连调 api开发文档,约定
    - 前后端分离开发，以API开发文档为约定 
    - 前端当家作主
    - 前端也有了路由 react-router-dom
    /user/:id path 页面级别组件
    - html/css/js react 框架
        useState
        useEffect
            fetch 后端 api 接口 ，拿到数据
            完成web应用
            PC/Mobile/App/小程序/桌面端 大前端