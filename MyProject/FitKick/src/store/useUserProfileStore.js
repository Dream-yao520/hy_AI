import { create } from 'zustand';

const useUserProfileStore = create((set) => ({
  userInfo: {
    nickname: '海绵宝宝',
    level: '100级',
    slogan: '我准备好了，我准备好了',
    avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
  },
  showActionSheet: false,
  setUserInfo: (newUserInfo) => set((state) => ({
    userInfo: { ...state.userInfo, ...newUserInfo }
  })),
  setShowActionSheet: (show) => set({ showActionSheet: show }),
  generateNewAvatar: async (text) => {
    const { generateAvatar } = await import('@/llm');
    const newAvatar = await generateAvatar(text);
    set((state) => ({
      userInfo: { ...state.userInfo, avatar: newAvatar }
    }));
  }
}));

export default useUserProfileStore;