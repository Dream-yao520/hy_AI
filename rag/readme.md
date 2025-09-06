# RAG

- Function Call 给llm 提供工具和服务
- MCP定义了LLM与外部资源的通信协议

RAG（检索增强生成）是一种通过先从外部知识库检索相关信息，再将这些信息作为上下文输入给大语言模型，以生成更准确、更相关回答的技术。

- 增强？
    给LLM 提供丰富的上下文
- 检索？
    律师、ppt、code 知识库

    prompt -> 知识库（检索embedding） prompt + 知识库（相关） -> LLM返回结果

- 检索
    如何在知识库里，根据prompt找到相关的那一段内容给大模型

    - embedding