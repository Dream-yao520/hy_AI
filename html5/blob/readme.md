# html5 王者对象Blob

- 从图片转成base64字符串编码 
- atob(base64编码) 二进制字符串编码
- for 每一位字符 
    charCodeAt()方法 0-255 8位的整数
    Uint8Array() 
- 二进制文件对象描述 new Blob([unit8Array],{type:'image/png'})
- 二进制层面上去压缩，切割，修改
    浏览器将会为二进制对象提供一个临时访问的地址
- URL.createObjectURL(二进制文件对象blob)