//没有class 的js 如何在苦苦追求 OOP 
//函数首字母大写 构造函数约定 1.类的概念
//2.构造函数
function Person(name, age) {
    // this 指向实例化对象
    this.name = name
    this.age = age
}
//函数对象 原型对象
//类的方法
Person.prototype = {
    sayHello: function () {
        console.log(`Hello, my name is ${this.name}`)
    }
}

// new 一下 实例化对象
//new 运行一个构造函数
let san = new Person('zhangsan', 18)
san.sayHello()
//原型对象
console.log(san.__proto__)
let p = { a: 1 }
console.log(p.__proto__)
console.log(p.tostring());

// console.log(new Person('lisi', 18))