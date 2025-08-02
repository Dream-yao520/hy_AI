import { create } from 'zustand'

export const useHomeStore = create((set) => ({
    tabs: ['推荐', '关注', '最新', '潮鞋', '运动', '游戏', '旅游', '舞蹈', '音乐'],
    activeTab: '推荐',//添加当前激活的tab
    setActiveTab: (tab) => set({ activeTab: tab }),//添加设置当前激活tab的方法
}))