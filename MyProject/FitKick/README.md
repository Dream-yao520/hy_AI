# react 电商 APP 
    FitKick

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
      react-vant(UI组件库) @react-vant/icons lib-flexible(移动端适配)  mockjs
      react-markdown
     开发期间的依赖
     vite-plugin-mock jwt postcss-pxtorem jsonwebtoken
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
## 功能模块
- UI 组件库
    - react-vant 第三方组件库 70%的组件已经有了，不用写
    - 选择一个适合业务的UI组件库 或者公司内部的组件库
- 配置路由及懒加载
    - 懒加载
    - 路由守卫
    - Layout组件
        - 嵌套路由Outlet 分组路由配置
        - 网页有几个模板 Layout
            - Route 不加path 对应的路由自动选择
            - 主模板 MainLayout tabbar模板
            - 空模板 BlankLayout
        - tabbar
            - react-vant + @react-vant/icons
            - value + onChange 响应式
            - 直接点击链接分享 active 的设置
- chatbot 模块
    - llm 模块 chat 封装
    - 迭代chat,支持任意模型
- Search
    - 防抖
    - api
        GoogleSuggest
    - localStorage
- 瀑布流
    - 小红书等主流App的内容浏览用户体验产品
        两列、图片高度不一致、落差感、
        滚动加载更多，图片懒加载
    - 接口  
        /api/images?page=${n}  支持翻页
        唯一id page + index
        随机图片，高度随机
    - images 怎么放到两列中？MVVM
    数据驱动界面（2列 奇偶）
    - 加载更多 位于盒子底部的 通过使用 IntersectionObserver
    观察它是否出现在视窗，性能更好，使用了观察者模式
    组件卸载时，直接使用observer.disconnect() 释放资源，防止内存泄漏
    - key id 下拉刷新
    - 使用IntersectionObserver 再次去执行图片懒加载  data-src

- login 模块
    - jwt 鉴权
    sign 颁发一个token user对象,secret 加密字符串
    decode  解码token,secret 加密字符串 
    - 加盐
    secret
    传递token的时候前面会加上 Bearer ${token} 持有者
    通过 http headers Authorization
- 前端的用户权限状态 流程
- zustand
        登录、user useUserStore
- 登录页面
        受控或者非受控组件
- 路由守卫
- api/
## 项目亮点和难点
- 前端智能
    - chat 函数
    - 对各家模型比较感兴趣，升级为kimChat,doubaoChat... 灵活
        性能、能力、性价比
        随意切换大模型，通过参数抽象
    - 文生图
        - 优化prompt 设计，
- 原子css
    - App.css 里面添加了通用样式
    - 各自模块里modeule.css 不影响组件
    - lib-flexible 移动端适配
    - postcss pxtorem 插件 快速还原设计稿
    - 原子类的css
        一个元素按功能逻辑拆分成多个类，和原子一样
        元素的样式就可以由这些原子类组合而成
        样式可以复用的更好，以后几乎可以不用写样式
- jwt 鉴权

## 项目遇到什么问题，怎么解决的
- chat messages 遇到message 覆盖问题
- 闭包陷阱问题
    一次事件里面，两次setMessages() 会导致闭包陷阱问题
- 自定义Hooks
- useTitle
    一定要设置
- 项目迭代
    - 功能由浅入深
    - chatbot deepseek 简单chat
    - deepseek-r1 推理模型
    - 流式输出
    - 上下文 LRU

- 升级瀑布流？
    - 骨架屏
    - 奇偶images 两列分配可能有时候会像天蚕脚一样，不好看
        两个响应式数组，判断哪一列高度更少，将新得到的img加入那个数组
    - intersectionObserver 用到两次，重复了，dry原则   
        封装成自定义hooks:useIntersectionObserver
    