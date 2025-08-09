// 不是js单线程
// worker 线程 复杂或耗性能的计算
// 这个能力来自浏览器
// js 仍然还是单线程，只不过在复杂计算的时候用worker 线程
// 不可以使用document，this不是原来的this
// 线程间的通信，消息机制
// console.log(this);

// console.log(document.querySelector('box'))

// 接收主线程的消息
self.onmessage = (e) => {
    console.log(e, e.data);
    self.postMessage('hello form worker')

}


