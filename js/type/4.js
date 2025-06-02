//枚举类型
const STATUS = {
    //常量
    READY: Symbol('ready'),
    LOADING: Symbol('loading'),
    DONE: Symbol('done'),
}

let state = STATUS.READY;
if (state === STATUS.READY) {
    console.log('ready');
}