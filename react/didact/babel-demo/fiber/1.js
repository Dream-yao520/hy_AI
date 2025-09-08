// 全局对象，指向下一个要处理的单元工作（即一个fiber 节点）
// fiber 对象 链表
let nextUnitOfWork = null
// 浏览器空闲时间调用
function workLoop(deadline) {
    let shouldYield = false // 默认不中断
    nextUnitOfWork = performaUnitOfWork(nextUnitOfWork)
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performaUnitOfWork(nextUnitOfWork)
        // 如果任务时间小于1ms，停止执行，避免阻塞渲染
        shouldYield = deadline.timeRemaining() < 1
    }
}
// 模拟实现，schedule 任务调度
requestIdleCallback(workLoop)