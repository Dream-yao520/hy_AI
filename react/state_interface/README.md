# typescript
- js的超集
- 类型约束
- ts 在 react业务中用法，直接抄作业
  - 子组件 + props的约定
  interface Props {
    name: string;
  }
  : React.FC<Props>
  - 组件 state
    - 单项数据流
    - props callback
    - 函数类型声明 () => void
    - 参数类型约定
    - React 对ts 原生支持的非常好
      React.FC
      React.ChangeEvent<HTMLInputElement>