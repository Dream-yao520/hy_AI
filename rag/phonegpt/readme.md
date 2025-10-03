# phoneGPT

- chatbot
    组件、tailwindcss messages
    ai streaming 复杂 封装？
    大模型
- 专业领域的chatbot
    RAG 手机知识库 检索增强
    - 知识库（爬虫）
    - 向量数据库（supabase）

## 项目中用到的技术

- RAG 检索增强生成
    - embedding openai embed 向量化
    - 相似度 cos -> 1 倒序排序
    - 存到supabase数据库 
### package.json
- ai sdk
    build AI-powered applications
    封装了LLM的调用
    @ai-sdk/openai 调用LLM 
    @ai-sdk/react hooks api 式一行完成流式输出

- supabase
    BASS Backend as Service
    Postgres 支持 向量数据库
- langchain
    LangChain 是一个用于构建 AI 应用的框架，
    它连接大模型、数据源和工具，简化了从提示工程到链式调用、记忆管理和代理决策的开发流程。 3e'wew
    @langchain/community 社区提供的工具（爬虫）
    @langchain/core 核心模块
- dotenv
- puppeteer 是一个 Node.js 库，用于控制无头浏览器（如 Chrome）,可自动化网页操作，如截图、爬虫、取数据、测试交互等。
- lucide-react  是一个轻量、开源的 React 图标库
- react-markdown 是一个React 组件，用于渲染Markdowm 模式
