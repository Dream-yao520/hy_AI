// {} key:value o(1) HashMap Map
// 第一种重要数据结构 
// 第二种数据结构 链表、队列、栈
// 长度限定、类型
// 可以限定、动态扩容
const arr = [1, 2, 3]
const arr2 = new Array(5).fill(undefined)
for (const key in arr2) {
    console.log(key, arr2[key])
}
arr2[8] = undefined
console.log(arr2)
for (let key in arr2) {
    console.log(key, arr2[key]) //有key才会迭代
}