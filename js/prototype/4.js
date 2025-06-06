function Person(name, age) {
    // this 指向实例化对象
    this.name = name
    this.age = age
}
Person.prototype.sayHello = {
    function() {
        console.log(`Hello, my name is ${this.name}`)
    }
}

var san = new Person('zhangsan', 18)
console.log(san.__proto__)
var a = {
    name: '孔子',
    country: '中国'
}
san.__proto__ = a
console.log(san.__proto__)
console.log(san.country)
