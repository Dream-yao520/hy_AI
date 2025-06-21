//完成的功能
// function objectFactory() {
//     var obj = {}
//     //类数组上没有shift方法,所以借用数组的shift方法
//     var Constructor = [].shift.call(arguments)//构造函数
//     var res = Constructor.apply(obj, arguments)
//     obj.__proto__ = Constructor.prototype
//     // || 处理 null的情况 ,仍然返回obj  构造函数 return 简单类型，忽略
//     return typeof res === 'object' ? res || obj : obj
// }

//es6版本
function objectFactory(Constructor, ...args) {
    var obj = {}
    //类数组上没有shift方法,所以借用数组的shift方法
    // var Constructor = [].shift.call(arguments)//构造函数
    var res = Constructor.apply(obj, args)
    obj.__proto__ = Constructor.prototype
    // || 处理 null的情况 ,仍然返回obj  构造函数 return 简单类型，忽略
    return typeof res === 'object' ? res || obj : obj
}

function Person(name, age) {
    this.name = name
    this.age = age
    // return 1
    // return {
    //     name: name,
    //     age: age,
    // }
    return null
}

Person.prototype.sayHi = function () {
    console.log(`您好，我是${this.name}`)
}

// let p = new Person('张三', 18)
// p.sayHi()

let p = objectFactory(Person, '张三', 18)
console.log(p);
p.sayHi()
console.log(p instanceof Person)


// new personalbar(...) -> function [[construct]] ->{}&&this -> {} -> [[call]]
// ->{}.__proto__ -> Constructor.prototype -> return{}