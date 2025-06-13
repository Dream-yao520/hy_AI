//add 函数,3个参数
//add.length 3
function add(a, b, c) {
    return a + b + c
}

add(1, 2, 3)
//柯里化 手写curry函数
function curry(fn) {
    //fn? 参数 最终要执行的功能 闭包中的自由变量 词法定义环境
    //curry 包装fn 慢慢收集参数
    //... args表示所有参数 自由变量
    const judge = (...args) => {
        //es6 reset 运算符
        // 任何地方都可以访问到定义时候的fn
        if (args.length === fn.length) {
            // 退出条件
            return fn(...args)
        }
        return (...newArgs) => judge(...args, ...newArgs)

    }
    return judge
}
let addCurried = curry(add)
//逐步的去获取函数需要的参数，当到达fn需要的参数个数时，执行fn。
console.log(addCurried(1, 2)(3))
