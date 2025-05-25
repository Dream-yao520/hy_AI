//声明一个对象常量
//内存中开辟一个空间，里面存放一个对象
//hxt 取址 & 变量名是地址的标记
//js 是弱类型语言 变量的类型由值决定
//= 赋值 Object
//对象字面量（字面意义上） JSON
//JS 太灵活，不需要new,通过{}拿到对象[]拿到数组
const hxt = {
    name: '黄耀',
    age: 20,
    tall: 173,
    hometown: '抚州'
}
const pyc = {
    name: '黄亮',//key value String
    age: '18',//number 数值类型
    hometown: '抚州',
    isSingle: true,//Boolean 布尔类型
    //送花
    //形参
    sendFlower: function (girl) {
        console.log(pyc.name + '给' + girl.name + '送了99朵玫瑰')
        girl.receiveFlower(pyc)
    }
}

const xm = {
    emotion: 30,//心情指数
    name: '小美',
    room: '101',
    receiveFlower: function (sender) {
        console.log('收到了' + sender.name + '送的99朵玫瑰')
        if (xm.emotion > 90) {
            console.log('西湖逛一下')
        } else {
            console.log('gun ~~~')
        }
    }
}
//帮黄亮送花 小美的闺蜜
const xh = {

    name: '小红',
    room: '101',
    hometown: '抚州',
    //送小美，送小红，，都具有receiveFlower方法
    //对象互换
    //接口 interface
    receiveFlower: function (sender) {
        // if(sender.name === '黄亮'){
        //     console.log('黄亮，我们在一起吧')
        //     return 
        // }
        setTimeout(() => {//定时器
            console.log('收到了' + sender.name + '送的99朵玫瑰')
            xm.emotion = 99
            xm.receiveFlower(sender)
        }, 3000)

        xm.receiveFlower(sender)
    }
}
pyc.sendFlower(xh)
