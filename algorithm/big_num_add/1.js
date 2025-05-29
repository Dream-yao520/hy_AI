/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
    let result = '';//存储结果
    let carry = 0;//存储进位
    let i = num1.length - 1;//num1的指针
    let j = num2.length - 1;//num2的指针
    while (i >= 0 || j >= 0 || carry > 0) {//只要有一个不为0，就继续循环
        //边界
        const digit1 = i >= 0 ? parseInt(num1[i]) : 0;//将字符串转换为数字
        const digit2 = j >= 0 ? parseInt(num1[j]) : 0;//将字符串转换为数字
        const sum = digit1 + digit2 + carry;//存储相加的结果
        result = (sum % 10) + result;
        carry = Math.floor(sum / 10);
        i--;
        j--;
    }
    return result;
};