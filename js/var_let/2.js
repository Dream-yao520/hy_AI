//一句代码
//V8引擎
//变量提升
//编译阶段
//执行阶段
//全局作用域中的变量
//window?前端方式来运行
var a = 1
// console.log(window.a)//在后端没有window ,window is not defined server
console.log(global.a)//node 顶层对象