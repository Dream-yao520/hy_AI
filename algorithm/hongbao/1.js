/**
 * @param {number} total 红包总金额
 * @param {number} num 红包个数
 * @return {number[]} 随机金额数组
 */
function hongbao(total, num) {
    const arr = []
    let restAmount = total//剩余金额
    let restNum = num//剩余个数
    for (let i = 0; i < num - 1; i++) {
        //Math
        //包装类
        let amount = (Math.random() * (restAmount / restNum * 2)).toFixed(2)//随机金额

        restAmount -= amount
        restNum--
        arr.push(amount)
        // -公平性
        //平均值
        //随机性
    }
    arr.push(restAmount.toFixed(2))
    return arr
}
console.log(hongbao(100, 10))