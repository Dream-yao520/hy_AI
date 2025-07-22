// 请求
import {
    getRepoList
} from '../api/repo'
import { create } from 'zustand'

export const useReposStore = create((set) => ({
    repos: [],
    loading: false,
    error: null,
    fetchRepos: async () => {
        set({ loading: true, error: null })
        try {
            const res = await getRepoList('Dream-yao520')
            set({ repos: res.data, loading: false, error: null })
        } catch (error) {
            // 问题：没有重置repos为数组
            set({ loading: false, error: error.message })
        }
    }
}))