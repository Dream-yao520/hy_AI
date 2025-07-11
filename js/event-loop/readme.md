# event-loop
事件循环机制 js 执行机制

- js 单线程 
    同一时刻只做一件事
    同步任务尽快执行完，渲染页面（重绘重排），响应用户交互（优先）
    耗时性的任务？
    - setTimeout/setInterval
    - eventListener
    - fetch/ajax
- script 脚本
    一个宏任务

- 微任务有哪些
紧急的，优先的，同步任务执行完后的一种补充
    - promise.then()
    - MutationObserver    
        做到DOM的改变，在页面渲染前 拿到DOM的改变
        
    - queueMicrotask
    - process.nextTick()
