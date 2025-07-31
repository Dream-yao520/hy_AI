# react 电商 APP

## 技术栈
    - React全家桶
    React 组件开发
    组件的封装
    第三方组件库
    受控组件和非受控组件
    hooks编程 自定义hooks
    React-Router-DOM
        SPA
        路由守卫
        懒加载
    Zustand
- mock 接口模拟
- axios 请求拦截和代理
- jwt 登录
- module css
- vite 配置
- 性能优化
    防抖节流
    useCallback useMemo ...
- css 预处理器 stylus
    flex transition transform...
- LLM 
    - chat
    - 生图
    - 语音
    - coze 工作流 调用
    - 流式输出
- 移动端适配
    rem
- 单例模式 
- git 提交

## 项目的架构
- components
- pages
- store
- hooks
- api
- mock
- utils
## 开发前的准备
- 安装的包
    react-router-dom zustand axios
      react-vant(UI组件库) @react-vant/icons lib-flexible(移动端适配)  postcss-pxtorem
     开发期间的依赖
     vite-plugin-mock jwt 
- vite 配置
    - alias
    - mock
    - .env.local
        llm apiKey
    - user-scalable=no
    - css 预处理
        index.css reset
            box.sizing  font-family:-apply-system
        App.css 全局通用样式样式
        module.css 模块化样式
    - 移动端适配 rem
        不能用px，相对单位rem html
        不同设备上体验要一致
        不同尺寸手机 等比例缩放
        设计师设计稿 750px iphone 4 375pt * 2 = 750
        小米
        css 一行代码 手机不同尺寸 html font-size 等比例
        layout
        flexible.js 阿里 在任何设备上
        1rem = 屏幕宽度/10
- lib-flexible
    阿里开源
    设置html fonSize = window.innerWidth / 10
    css px 宽度 = 手机设备宽度 = 375
    1px = 2发光源
    750px 设计稿

- 设计稿上一个盒子的大小？
    - 1像素不差还原设计稿
    - 设计稿中像素单位
    - /75