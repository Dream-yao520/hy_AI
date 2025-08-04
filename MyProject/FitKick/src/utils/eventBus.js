// 导入 mitt 库
import mitt from 'mitt';

// 创建事件总线实例
const eventBus = mitt();

// 导出事件类型常量
export const EVENT_TYPES = {
  ADD_LIKE: 'addLike',
  RESET_BADGE: 'resetBadge'
};

// 导出事件总线
export default eventBus;