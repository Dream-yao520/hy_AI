/**
 * @func 两数之和
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
//函数编写者
//函数调用
//健壮性
//typeof 预算符 
// 判断数据的类型，简单数据类型  除了null
//返回值是类型的字符串
function add(a, b) {
    //
    if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
        throw new TypeError('a 和 b 必须是数字')
    }
    //参数的校验
    return a + b
}


console.log(add(0.5, 0.3)) // Выведет: 5