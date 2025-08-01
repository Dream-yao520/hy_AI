// search 全局共享状态
import {
    create
} from 'zustand'
import {
    getSuggestList,
    getHotList
} from '@/api/search'

export const useSearchStore = create((set, get) => {
    // 从本地存储中加载搜索历史
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
    return {
        searchHistory,
        suggestList: [], // suggestList 建议列表
        hotList: [], // 热门搜索
        query: '', // 当前搜索查询字符串
        searchValue: '', // 搜索值
        isSearching: false, // 是否正在搜索
        MAX_HISTORY_LENGTH: 20, // 最大历史记录数量

        setSuggestList: async (keyword) => {
            const res = await getSuggestList(keyword)
            set({
                suggestList: res.data
            })
        },
        setHotList: async () => {
            const res = await getHotList()
            set({
                hotList: res.data
            })
        },
        setQuery: (query) => {
            set({ query })
        },
        setSearchValue: (searchValue) => {
            set({ searchValue })
        },
        handleSearch: (val) => {
            set(state => {
                let newSearchHistory = [...state.searchHistory];
                if (val) {
                    // LRU缓存逻辑实现
                    const index = newSearchHistory.indexOf(val);

                    // 如果已存在则移除原位置
                    if (index !== -1) {
                        newSearchHistory.splice(index, 1);
                    }
                    // 如果达到最大长度则移除最后一项
                    else if (newSearchHistory.length >= state.MAX_HISTORY_LENGTH) {
                        newSearchHistory.pop();
                    }

                    // 添加到开头（最近使用）
                    newSearchHistory.unshift(val);
                }

                // 保存到本地存储
                localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory));

                return {
                    isSearching: true,
                    searchValue: '',
                    searchHistory: newSearchHistory,
                    query: val
                }
            });

            // 模拟搜索完成
            setTimeout(() => {
                set({ isSearching: false });
            }, 1000);
        },
        clearHistory: () => {
            // 清空本地存储
            localStorage.setItem('searchHistory', JSON.stringify([]));
            set({ searchHistory: [] });
        },
        deleteHistoryItem: (index) => {
            set(state => {
                const newSearchHistory = [...state.searchHistory];
                newSearchHistory.splice(index, 1);
                // 更新本地存储
                localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory));
                return { searchHistory: newSearchHistory };
            });
        },
        handleHistoryClick: (item) => {
            set({ searchValue: item });
        }
    }
})