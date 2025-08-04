import { create } from 'zustand'
import { getDetail } from '@/api/detail'

// 保存初始图片
const initialImages = [{
    alt: '',
    url: '/306321fd-3507-4e60-9e3e-17b81049e594.png',
}, {
    alt: '',
    url: '/35464b08-9012-47ad-83a1-429e8dfbf0f5.png',
}, {
    alt: '',
    url: '/35c19a5e-625c-41dc-82b8-7277ffacf7cd.png',
}, {
    alt: '',
    url: '/f1bf4bf5-be62-4f36-8e6b-e7d61a458b78.png',
}]
const useDetailStore = create((set) => ({
    detail: {
        id: '',
        title: '',
        desc: '',
        price: '',
        images: initialImages,
    },
    loading: false,
    setDetail: async (id, clickedImageUrl = '') => {
        set({ loading: true })
        const res = await getDetail(id)
        const combinedImages = [...initialImages];
        if (clickedImageUrl) {
            // 将点击的图片添加到数组开头
            combinedImages.unshift({
                url: clickedImageUrl,
                alt: res.data.title || '点击的图片'
            });
        }

        // 更新res.data.images
        res.data.images = combinedImages;
        set({
            detail: res.data,
            loading: false
        })
    },
}))

export default useDetailStore
