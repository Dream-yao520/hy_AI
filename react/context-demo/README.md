# useContext

- 组件层次太深，组件通信机械化
- 上下文对象 **全局状态**共享 
- 使用流程
    - 创建一个上下文对象
    - provider 全局声明
    - 在任何地方，useContext 使用状态 

## 数据状态共享 肯定不止有一种方式
- 组件单项数据流通信
- 创建上下文对象
    - 在他Provider的内部，useContext 拿到状态
        ThemeContext.Provider 组件，react的一贯作风，将组件进行到底
    - 一般在全局使用