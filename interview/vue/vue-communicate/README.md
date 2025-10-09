# 组件通信

- 父子
    - props 父传子

- 子父
    - emit 子传父 事件触发
- 兄弟
- 跨级
- 事件总线
- 全局

## vue 选项式(options) API
- 选项式写法，非常傻瓜，好理解
    data 数据 自有状态
    props 参数
    methods 方法
    components 组件
    setup 组合式API 函数式写法
    return {
        ref 响应式数据 组合式API
    }
    好处是新手喜欢
    高手特别烦 被类式写法所限制，this丢失的问题

- vue3 setup 组合式API 借鉴react 函数式写法
- provide/inject 跨组件通信
- 订阅发布者 事件总线
