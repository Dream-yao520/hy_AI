import { create } from 'zustand'
import { getImages } from '@/api/home'

export const useImageStore = create((set, get) => ({
    images: [],
    leftImages: [],
    rightImages: [],
    leftHeight: 0,
    rightHeight: 0,
    currentTab: '推荐',
    page: 1,
    loading: false,
    fetchMore: async (tab = get().currentTab) => {
        // 如果tab变化，重置数据
        if (tab !== get().currentTab) {
            set({
                images: [],
                leftImages: [],
                rightImages: [],
                leftHeight: 0,
                rightHeight: 0,
                page: 1,
                currentTab: tab,
                loading: false
            })
        }
        // 如果还在请求中，不再发起新的请求
        if (get().loading) return;
        set({ loading: true }) // 请求中
        const res = await getImages(get().page, tab);
        const newImages = res.data;
        set((state) => ({
            images: [...state.images, ...newImages],
            page: state.page + 1,
            loading: false
        }))
        // 分配新图片到左右列
        get().allocateImages();
    },
    allocateImages: () => {
        const images = get().images;
        let leftHeight = 0;
        let rightHeight = 0;
        const leftImages = [];
        const rightImages = [];

        // 重新分配所有图片
        images.forEach(img => {
            if (leftHeight <= rightHeight) {
                leftImages.push(img);
                leftHeight += img.height;
            } else {
                rightImages.push(img);
                rightHeight += img.height;
            }
        });

        set({
            leftImages,
            rightImages,
            leftHeight,
            rightHeight
        });
    }
}))
