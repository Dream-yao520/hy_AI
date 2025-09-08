# 手写React

- Dideact
    - 命名空间 namespace
    - 对象字面量

- VDOM
    UI 表达 JSX
    JSX -> 转成VDOM ？ 

- JSX react 优点
    js 里编写HTML,及其简便的表达UI 
    babel React.createElement
    Dideact.createElement
## createElement
- App.jsx -> babel -> Dideact.createElement(tag,props,...children)
    返回的结果 VDOM 
-> render 生成真正的DOM
- 由Vnode 节点组成的VDOM树，每个节点包含type,props两个属性
    props.children 是子节点，也是一个对象

    React.createElement 返回的 Element 就是一个描述“要在页面上渲染什么”的普通 JavaScript 对象（即虚拟 DOM 节点），
    它包含 type、props 等属性，是 React 用来对比变化并高效更新真实 DOM 的虚拟表示。

- createTextElement 这么复杂？
    type 没有的
    children 没有的
    统一，执行render

## Didact 运行的入口
- babel 将JSX 转义为React.createElement方法调用，
    给相应的参数生成VDOM
    @babel/preset-react pragma 编译后的函数名
    安装pnpm i @babel/core @babel/cli babel-loader @babel/preset-react -D

    npx babel src/index.jsx -o dist/compiled.js

## 目前完成
- React is a namespace
- The createElement function (工厂模式)
- The render Function
- Concurrent Mode 并发模式
- Fiber 机制 可中断

## Concurrent Mode 并发模式
React Concurrent Mode 是一种让渲染过程可中断、可优先级排序的机制，
通过将工作拆分为小块并允许高优先级更新（如用户输入）插队，从而避免主线程阻塞，提升应用的响应性和流畅度。
fiber 节点 工作节点 
- 中断
- 继续
- fiber 节点对象有哪些节点属性