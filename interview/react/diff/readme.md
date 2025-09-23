# diff 算法
给两棵虚拟DOM树，VDOM 
要输出一个补丁（patches）列表，描述如何把DOM 从oldTree 转换为newTree
操作要最少。

- 同层比较
- 类型不同直接删除
- 递归方式，比较children
- 根据key比较children移动优先

- props 对比
通过合并新旧属性键集并逐一对比，找出所有属性值的变化，统一打包为属性更新补丁，实现最小化更新。