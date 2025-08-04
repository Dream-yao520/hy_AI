import { create } from 'zustand'

// 模拟商品数据 - 这些商品会默认显示在喜欢列表中
const initialProducts = [
    { id: 1, name: 'Nike Dunk Retro "Black"经典外', price: 468, size: '42.5码', image: '/306321fd-3507-4e60-9e3e-17b81049e594.png' },
    { id: 2, name: 'Nike Zoom Structure 25舒适耐', price: 369, size: '36.5码', image: '/35464b08-9012-47ad-83a1-429e8dfbf0f5.png' },
    { id: 3, name: 'Nike Court Borough舒适百搭 ', price: 253, size: '36.5码', image: '/35c19a5e-625c-41dc-82b8-7277ffacf7cd.png' },
    { id: 4, name: 'Nike Court Legacy舒适', price: 174, size: '35.5码', image: '/f1bf4bf5-be62-4f36-8e6b-e7d61a458b78.png' },
];

export const useLikeStore = create((set, get) => ({
    products: initialProducts, // 设置初始喜欢的商品
    selectedItems: {},

    // 切换商品选中状态
    toggleSelect: (id) => {
        set((state) => ({
            selectedItems: {
                ...state.selectedItems,
                [id]: !state.selectedItems[id]
            }
        }))
    },

    // 清除所有选中状态
    clearSelected: () => {
        set({ selectedItems: {} })
    },

    // 添加喜欢的商品
    addLikeProduct: (product) => {
        set((state) => {
            const exists = state.products.some(p => p.id === product.id);
            if (exists) return state;
            return { products: [...state.products, product] };
        });
    },

    // 移除喜欢的商品
    removeLikeProduct: (productId) => {
        set((state) => ({
            products: state.products.filter(p => p.id !== productId),
            selectedItems: { ...state.selectedItems, [productId]: false }
        }));
    },

    // 批量移除选中的商品
    removeSelectedProducts: () => {
        set((state) => ({
            products: state.products.filter(p => !state.selectedItems[p.id]),
            selectedItems: {}
        }));
    },

    // 获取选中商品数量
    getSelectedCount: () => {
        const state = get();
        return Object.values(state.selectedItems).filter(Boolean).length;
    },

    // 获取选中商品总价
    getSelectedTotalPrice: () => {
        const state = get();
        return state.products.reduce((total, product) => {
            if (state.selectedItems[product.id]) {
                return total + product.price;
            }
            return total;
        }, 0);
    },
}))