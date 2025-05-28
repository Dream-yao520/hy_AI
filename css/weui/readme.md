# 微信当家框架WEUI

## BEM 国际命名规范

-项目 .weui-page
    -button 页面
规范
-Block 概念
    一块内容 项目代号 风格+有哪些可复用的代码
    项目代号 + 区块作用或职责 page
    .weui-page
    .tm-page
-Element 概念
    元素  __header
        块__
    同一个块中概念不重叠
    .weui-page__title
    .weui-page__desc
-UI **框架**中button,input,cell,通用的**组件**
    重启BEM命名
    。weui-btn **复用**
    业务代码？
    大厂
    基础架构代码  学习weui的源码

    几个block组合起来，页面就出来，组件式开发
-modifier
    状态
    .weui-btn_primary
    .weui-btn_default
-BEM 规范让我们一起大厂协作
    -页面由Block构成 .weui-{block}
    -Block包含一些Element .weui-{block}__{element}
    -Element包含一些modifier 会有一些状态   .weui-{block}__{element}_{modifier}