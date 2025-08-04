import { create } from 'zustand';

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

// 导出一个函数，用于在添加喜欢时触发徽章更新
export const triggerBadgeUpdate = (count = 1) => {
  const store = useBadgeStore.getState();
  store.incrementNewLikes(count);
};

// 导出一个函数，用于在查看喜欢页面时重置徽章
export const resetBadge = () => {
  const store = useBadgeStore.getState();
  store.resetNewLikes();
};