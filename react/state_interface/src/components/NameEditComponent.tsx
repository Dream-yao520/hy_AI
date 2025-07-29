import React from 'react'

interface Props {
    username: string;
    // typescript 除了内置的类型外，还可以自定义类型 class interface
    // React 提供的类型 事件类型 ChangeEvent
    // type = 'radio' | 'checkbox' 也会有ChangeEvent
    // HTMLInputElement event.target.value?
    // 重要的地方进行一个约束 不会出错 99.99%的错误减少
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const NameEditComponent: React.FC<Props> = (props) => {
    return (
        <>
            <label>
                Udate Name:
            </label>
            <input value={props.username} onChange={props.onChange} />
        </>
    )
}

export default NameEditComponent