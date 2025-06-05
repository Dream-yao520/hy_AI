# Github 最受欢迎 50 projects 50 day

- html结构
- 布局
  - 居中
    position: absolute（定位元素） + transform（变基）: translate/rotate(-50%, -50%) （自身 移动）
  - 5个元素的一行布局 ？
- js 交互

1. 合适的标签 BEM 类名
2. 弹性布局的居中方案
   - body
   - flex 是移动端时代（PC 时代）新的布局方式 
     弹性的布局格式化上下文 display: flex;
     两者附属在flex上面的属性：无flex下面的属性不会生效
     - align-items 纵轴 y轴
     - justify-content 主轴 x轴
     - .container 居中 也就是子元素居中
     - 父元素和子元素们之间的布局方案
       - 子元素们不会换行
   - 100vh 相对单位
     view height 不同设备但是等比例单位 100vh 就是不同设备的一屏高度
     view width

3. 弹性布局等比例划分
   父元素flex：0.5
   子元素flex：2 假如有三个子元素，就是划分成了 4:1:1 的比例
4. 弹性布局的子元素
   - 子元素们不会换行
   - 子元素们会自动等比例划分
   - 子元素们会自动居中

- 前端核心用户体验
  - 和谐
  - 艺术性
    transition:opacity 0.3s ease-in 0.4s;
    opacity: 0;是透明度为0，也就是隐藏了。
    opacity: 1;是透明度为1，也就是显示了。

