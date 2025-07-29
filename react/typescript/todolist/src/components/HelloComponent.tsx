import React from 'react'
// 如何约束函数的返回值为ReactNode? JSX
// FC = FunctionComponent  函数组件
// 如何约定组件需要一个name的prop?
// 接口类的定义
interface HelloComponentProps {
    name: string;
}
// typescript 类型约束重要的地方一定要类型约束
// 参数，返回值
// 泛型 泛指内部的类型
const HelloComponent: React.FC<HelloComponentProps> = (props) => {
    // const { name } = props
    return (
        <>
            <h1>hello user:{props.name}</h1>
        </>
    )
}

export default HelloComponent
