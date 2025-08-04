import { create } from 'zustand';
import eventBus, { EVENT_TYPES } from '@/utils/eventBus';

// 创建徽章提示状态管理
export const useBadgeStore = create((set) => ({
  // 新添加的喜欢商品数量
  newLikeCount: 0,
  
  // 增加新喜欢商品计数
  incrementNewLikes: (count = 1) => {
    set((state) => ({
      newLikeCount: state.newLikeCount + count
    }));
  },
  
  // 重置新喜欢商品计数
  resetNewLikes: () => {
    set({ newLikeCount: 0 });
  }
}));

// 监听添加喜欢事件
eventBus.on(EVENT_TYPES.ADD_LIKE, (count = 1) => {
  const store = useBadgeStore.getState();
  store.incrementNewLikes(count);
});

// 监听重置徽章事件
eventBus.on(EVENT_TYPES.RESET_BADGE, () => {
  const store = useBadgeStore.getState();
  store.resetNewLikes();
});

// 导出函数，用于在其他地方触发事件
export const triggerBadgeUpdate = (count = 1) => {
  eventBus.emit(EVENT_TYPES.ADD_LIKE, count);
};

export const resetBadge = () => {
  eventBus.emit(EVENT_TYPES.RESET_BADGE);
};