console.log('同步Start')
const promise1 = Promise.resolve('Frist Promise')
const promise2 = Promise.resolve('Second Promise')
const promise3 = new Promise(resolve => {
    console.log('promise3');
    resolve('Third Promise')
})
promise1.then(value => console.log(value))
promise2.then(value => console.log(value))
promise3.then(value => console.log(value))
setTimeout(() => {
    const promise4 = Promise.resolve('Fourth Promise')
    promise4.then(value => console.log(value))
    console.log('setTimout')
}, 0)
setTimeout(() => {
    console.log('setTimeout2')
}, 0)
console.log('同步end')
