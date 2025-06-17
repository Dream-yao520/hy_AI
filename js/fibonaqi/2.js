// 如何用闭包优化斐波那契
//记忆功能
function memoizedFid() {
    //闭包 1.函数嵌套函数
    //自由变量
    const cache = {}//存储
    return function fib(n) {
        if (n <= 1) return n;
        if (cache[n]) return cache[n];//如果有缓存 直接返回
        return cache[n] = fib(n - 1) + fib(n - 2)
    }
}
//可以在外部访问
const fib = memoizedFid()
console.log(fib(100))
