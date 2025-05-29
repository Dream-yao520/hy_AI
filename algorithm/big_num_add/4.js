const bigNum = 123456789012345678901234567890123456789n
//BigInt 声明方式 函数声明
//bigint 是简单数据类型,不是对象,不是构造函数,不能new
const theNum = BigInt('123456789012345678901234567890123456789')
console.log(bigNum)
console.log(theNum)
console.log(typeof bigNum, typeof theNum, typeof 1)

console.log(bigNum + 1n)

