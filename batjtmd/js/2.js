//数组对象
const arr = ['a', 'b', 'c']
console.log(typeof arr)
const date = new Date()
console.log(typeof date)
// 如何区分Object的这些类型？
// [object Array]  [object Date]  [object Object]
console.log(Object.prototype.toString.call(arr))
console.log(Object.prototype.toString.call(date))

//会在MDN文档看一些资料
function getType(value) {
    //string api 的选择
    //split + substring
    return Object.prototype.toString.call(value).slice(8, -1)
}

