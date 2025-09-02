# 性能优化

## 重绘重排

- 重绘
    当元素样式改变但不影响布局时，浏览器重新绘制元素的过程。如改变颜色背景等。
- 重排
    DOM元素的尺寸、位置发生变化时，浏览器需要重新计算布局，影响其它元素位置的过程。
    重排一定导致重绘，重绘不一定导致重排。（性能开销更大）

### DEMO 1 批量修改DOM
```js
// 不对的 多次操作可能触发多次重排重绘
// 虽然现代浏览器会合并修改，优化
// 但是可以避免

const div = document.getElementById('div')
div.style.width = '100px'
div.style.height = '100px'
div.style.margin = '10px'

// good
div.style.cssText = 'width: 100px; height: 100px; margin: 10px'

div.className = 'my-class' // 用类名而不是一堆js代码
```
### 使用文档碎片
```
const fragment = document.createDocumentFragment()
for(let i = 0; i < 1000; i++) {
    const div = document.createElement('div')
    div.textContent = `div${i}`
    fragment.appendChild(div)
}
document.body.appendChild(fragment)
// 批量添加元素时，使用document.createDocumentFragment()优化
```

## 脱离文档流进行操作 下线
```js
const div = document.getElementById('div')
div.style.position = 'absolute'
div.style.display = 'none'
...进行大量DOM 操作



div.style.display = 'block'
div.style.position = 'static'
```

### 缓存布局信息
```js
// offsetTop 读取 但是每次都会触发重排以获得盒子的布局信息
for(let i = 0; i < 1000; i++) {
    el.style.top = el.offsetTop + 10 + 'px'
}

// 缓存布局信息
const top = el.offsetTop
for(let i = 0; i < 1000; i++) {
    el.style.top = top + i * 10 + 'px'
}
```
### 使用transform 代替位置调整
```js
el.style.left = '100px'

// 不会触发重排 但是会触发重绘
el.style.transform = 'translateY(100px)'
```


## 资源加载优化
    - 图片懒加载
    - 路由懒加载
        代码文件上，code spliting 代码分割
    - 资源预加载
        
        <link rel="preload" href="https://example.com/resource.js">
        未来可能会用到的资源
        <link rel="prefetch" href="https://example.com/resource.js">
        dns-prefetch dns 预解析
    - script 资源的加载 
        默认没有
        async 并发
        defer 
        module // 功能
    - webp 格式图片
        图片的优化，显著的减少体积，并质量不受影响
    - 图标字体库
    减少http请求数
## JS执行优化
    - 防抖节流
    - web workers 处理复杂计算
    - requestAnimationFrame 优化动画
    - requestIdleCallback 空闲时间执行 react fiber 机制
        schedule 机制

## 框架层优化
    - memo,usememo,useCallback 避免不必要的渲染
    - shadcn-ui 按需加载组件库
    - 合理使用key 优化列表渲染

## 缓存
    - 强缓存和协商缓存
        Expires/Cache-Control
        Last-Modified/If-Modified-Since 时间戳
        ETag/If-None-Match
    - localStorage/seesionStorage/cookie
## 网络优化
    - CDN加速
        静态资源，分流，会缓存文件
        多路复用 多域名服务器
    - Gzip压缩
    - HTTP/2 多路复用
    - DNS 预解析

## 首屏优化
    - SSR 
        组件渲染在服务器端已经完成编译、执行，浏览器端直接显示
    - 骨架屏
    - http 2.0 server push 首屏数据推送


## 性能测试
    - chorm 的performance面板
    可以看到各项性能指标，针对性的优化，给出优化建议

    - 减少首屏JS/css 体积（code splitting）
    代码分割（Code Splitting） 是一种将代码库拆分成更小、更易管理的块的技术，以
    便按需加载或并行加载，从而优化应用的加载性能和执行效率。
    - 使用transform 代替位置调整，预加载相关资源
    juejin js = vue + vue-router + App.vue + Home.vue + Components
    vue+vue-router 单独拆分 缓存 基本不会变的
    App.vue + home.vue + Components 业务代码 经常改，单独
    做了一次升级

- lighthouse
    是chrome 的一款性能打分插件，会在 性能、无障碍、最佳实践、SEO 打分
    并给出问题和优化建议，非常细致。
    - 图片大小的优化 webp
    - 字体库
    - 渲染屏蔽请求

## 性能的关键指标
- FCP First Contentful Paint
    首次内容绘制（First Contentful Paint,FCP）是衡量网页加载性能的指标，表示浏览器首次渲染出页面内容（如文本、图片等）的时间。
- LCP Largest Contentful Paint
    最大内容ful 绘制时间（Largest Contentful Paint,LCP）是衡量网页加载性能的指标，
    表示浏览器渲染出页面中最大的内容元素（如图片、视频、文本等）的时间。

