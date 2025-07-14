# deep router

- router
- 401
- 301/302 重定向
- 404 
- 性能优化

- SPA 带来了优质的用户体验
    - 快
    - 不会白屏，不依赖于http去服务器端请求页面
- 前端首先加路由,SPA 应用
    React
    React-Router
    Redux
- 导航，封装
- 路由懒加载
    lazyload
    - / home
    - /about About
    只加载当前需要的
    其它的不加载
    首页
- es6 module 引入模块并且会执行
- 懒加载流程
    - import es6 加载并执行太多非必要组件
        影响首页加载速度，特别是页面很多的时候
    - 导入lazy,Suspense
        lazy 高阶组件（返回值是组件）
    - import('./pages/Home')动态加载
    - <Route/> 匹配到才会去动态加载相应的组件
    - Suspense 在还未加载前做一个Fallback
    