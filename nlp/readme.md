# 机器学习

-notebookllm
  你不知道的JavaScript 深入学习
  AI 博客


  -modelscope
  -阿里开源大模型社区
  -python nptebook
  ipynb 后缀
  nlp 机器学习文档格式

-python
  机器学习第一语言
  js 也挺好的


-引入了pipeline 模块
  model 中国第一大模型社区
  魔搭
#机器学习情感分析demo
#modelscope 命名空间
#机器学习有好多任务， pipe 管道
from modelescope.pipelines import pipeline
from modelescope.utils.constant import Tasks
#情感分析类
#pipeline派出任务
semantic_cls = pipeline(Tasks.text_classification,'damo/nlp_structbert_sentiment-classification_chinese-base')
打分 label分类
result = semantic_cls(input='遥遥领先，遥遥领先，遥遥领先')

//
