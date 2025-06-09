# 电影


## 良好的编程风格和用户体验的细节魔王
    -字节/腾讯/拼多多 代码风格手册

## 表单为何要阻止默认提交
-form action  ?
    html 早期 收集用户的数据 默认会由后端去处理（时间），会重新刷页面，是个不好的用户体验。
    页面会白题一下
    event.preventDefault() js雄起了 阻止默认行为，fetch（http） 去提交，没有必要去刷新页面了
    优化用户体验
-把用户当小白
    placeholder html5 新特性
    header 等语义化标签 html5新特性
    required 关键字 表单必填项 减少一些用户犯错
-函数模块化
    封装，复用，模块化
    
-JSONView 插件必装 更好的查看API 接口数据