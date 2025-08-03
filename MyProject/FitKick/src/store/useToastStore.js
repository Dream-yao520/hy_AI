import { create } from 'zustand'

export const useToastStore = create((set) => ({
    toast: null,

    // 显示Toast
    showToast: ({ message, type = 'info', duration = 2000 }) => {
        const toast = {
            message,
            type,
            id: Date.now()
        }

        set({ toast })

        // 定时关闭
        setTimeout(() => {
            set({ toast: null })
        }, duration)
    },

    // 手动关闭Toast
    closeToast: () => {
        set({ toast: null })
    }
}))