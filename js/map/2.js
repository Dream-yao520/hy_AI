//paeseInt num 
['1', '2', '3'].map((item, index, arr) => {
    console.log(item, index, arr)
    return item
})
//第二个参数是
console.log(parseInt('1', 0, ['1', '2', '3']))
console.log(parseInt('2', 1, ['1', '2', '3']))
console.log(parseInt('3', 2, ['1', '2', '3']))
