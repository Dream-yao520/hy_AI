# mcp

- Function Call
    可以让大模型 突破自身知识和能力的局限，通过调用外部工具
    或API来获取实时信息、执行计算或操作，从而获取最新数据，精确计算
    与外部系统交互的复杂任务。
- mcp model context protocol
    是一个协议，web 开发中的Restful协议,如何将外部资源暴露给LLM的协议和编程风格。
    是Function Call 的升级版

    在做各种Function Call有点乱的时候，mcp统一了一切。

    mcp是LLM与外界之间的通信协议，它就好像是USB，LLM训练完后不了解的知识
    LLM 本身不知道怎么调用地图、数据库、搜索引擎，MCP规定了标准的上下文
    交换方式，让大模型能像调用api一样去访问外部能力。

## 举例
    高德地图MCP,请帮我规划公司到机场的路线。
    根据搞得地图mcp插件，获取实时路径和交通数据

## 意义
- LLM 输出更可靠
- 降低集成成本（自有系统和LLM继承）
- 数据安全可控
高德地图接入MCP，就像LLM的眼睛和耳朵，让AI真正理解和使用实时世界

- 安装mcp 客户端 cline
- 高德地图aoikey

# mcp 的使用
- mcp server 是基于mcp协议的服务器软件
    定义tool...
- LLM 
- MCP client cline/cursor
    配置mcp server 地址
- LLM -> client -> server Transport 通信
