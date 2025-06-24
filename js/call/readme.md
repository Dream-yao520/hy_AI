# 手写call

- 手动指定函数内部的this
- 参数 一个一个 apply []
- 第一个参数是null或undefined this ? 
    严格模式报错
- 应用场景区别
    -call apply 立即执行的，区别是参数的传递方式，可以互换使用
    -bind 延迟执行

## 手写call
- call是属于所有函数的， Function 原型链上的方法
    gretting.call()