# 爬取数据

- 爬取流程
1. http 请求得到html
2. 正则 后端
3. css querySelector 
    内存之中，将html字符串渲染为dom树，x-crawl 支持在内存DOM树中使用querySelector 语法来查找。
4. AI 辅助
    用prompt去描述我们需要的内容，AI可以都代替我们和DOM 树沟通

- puppeteer 无头浏览器