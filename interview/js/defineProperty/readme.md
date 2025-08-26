# 响应式底层原理

- DOM API -> 响应式业务 自动化
- Object.defineProperty(obj,"value",{
    get:function(){
        console.log('读取了value属性');
        return value
    },
    set:function(newValue){
        console.log('设置了value属性');
        value = newValue
        // 数据改变了，我要更新视图
        document.getElementById('container').innerHTML = newValue
    }

})
    对象上的某个属性的某些行为（get,set）进行定义，在完成本来的职责的同时，去做dom更新
    这就是响应式
    拦截行为
    缺点：有点麻烦，每次只能定义一个属性
- obj.value
- REACT,VUE 现代前端MVVM框架，早期使用Object.defineProperty() 
    实现响应式，现在都使用Proxy
- es6 Proxy 可以一次代理整个对象，代理的行为更多

- 属性描述符(property descriptor)
    configurable 可配置 修改或者删除

