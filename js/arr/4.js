// 如何遍历数组
//  for(let i =0;i<arr.length;i++) 技术循环 性能好 可读性不好 不是人脑，电脑
// while
// forEach
// map filter find some every ...
// for...of
const names = Array.of('Ailce', 'Bob', 'Charlie', 'David')
// console.log(names)
names.forEach(name => {
    if (name === 'Charlie') {
        console.log('Charlie is here,stop')
        // break 这里不支持
    }
    console.log(name)
})