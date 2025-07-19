- JSX ?
    - JSX 不能独立运行
    - vite 工程化
        jsx -> React.createElement
    - React 环境中

- babel
    Make JavaSript Greate again!\
    大胆使用JS最新语法，不用等待
    es6 promise->es8 async await
    let -> var
    ()=>{} -> function(){}
    ./node_modules/.bin/babel 1.js -o 2.js

- 编译的流程
    - pnpm i @babel/cli @babel/core -D
        @babel/cli bbel 的命令行工具
        @babel/soreBabel的黑线眼里
        babel 负责JS 转码
        - DD开发阶段的依赖de'vdev）
        上线后是不用的
    - ./node_modules/.bin/babel
    转换的规则
    react -> IOS代码
    es6 -> es5
    JSX -> React.createElement