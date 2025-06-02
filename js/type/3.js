//独一无二的值
const sym = Symbol();
const sym1 = Symbol();
const sym2 = Symbol("desc");//label 标签
console.log(typeof sym, sym);
console.log(sym === sym1);
const age = Symbol('age');
//Symbol 可以用于对象的key
// 使用Symbol 构造函数实例化，一个标记位id 的唯一值ID
//ID 的唯一性， Symbol
const ID = Symbol('id');
//es6之前 key 只能是字符串
//Symbol 作为key 
const sex = '男';
const user = {
    name: 'zhangsan',
    age: 17,
    // [sex]: '男',
    //key是独一无二的
    //当我们在大厂，如果我们要去修改别人的代码中的对象
    //对象是动态的 不希望出错，
    [ID]: '123',
    [age]: 18,
}
// console.log(user.name, user[ID], user[age], user.age);
//面向对象私有属性的概念？
//对象的隐私，内部需要，不希望外界调用
for (let key in user) {//遍历对象
    console.log(key, user[key], '-------');
}