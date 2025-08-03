import { create } from 'zustand'

export const useProductStore = create((set) => ({
    tabs: ['推荐', '最新', '鞋类', '上衣', '裤子', '饰品', '玩具', '帽子', '球类', '品牌'],
    activeTab: '推荐',//添加当前激活的tab
    setActiveTab: (tab) => set({ activeTab: tab }),//添加设置当前激活tab的方法
}))