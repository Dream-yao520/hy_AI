import {
    ArrowLeft,
    Close,
} from '@react-vant/icons'
import { memo, useRef, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './search.module.css'
import { debounce } from '@/utils'

const SearchBox = (props) => {
    // 从props接收参数
    const { handleQuery, onSearch, value, showBackButton = true, autoFocus = false } = props
    // 使用value初始化内部state
    const [query, setQuery] = useState(value || '')
    const queryRef = useRef(null);
    const clearQuery = () => {
        setQuery('')
        queryRef.current.value = '';
        queryRef.current.focus();
    }
    const navigate = useNavigate();
    const handleChange = (e) => {
        let val = e.currentTarget.value;
        setQuery(val);
    }
    // 防抖
    const handleQueryDebounce = useMemo(() => {
        return debounce(handleQuery, 500)
    }, [])
    useEffect(() => {
        handleQueryDebounce(query);
    }, [query])
    // 添加useEffect监听value变化
    useEffect(() => {
        if (value !== query) {
            setQuery(value || '');
            if (queryRef.current) {
                queryRef.current.value = value || '';
            }
        }
    }, [value])
    // 处理搜索按钮点击
    const handleSearchClick = () => {
        onSearch(query);
    }

    // 处理回车键搜索
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && query.trim()) {
            onSearch(query);
        }
    }
    // 添加自动聚焦的effect
    useEffect(() => {
        if (autoFocus && queryRef.current) {
            queryRef.current.focus();
        }
    }, [autoFocus])

    return (
        <div className={styles.wrapper}>
            {/* 条件渲染返回按钮 */}
            {showBackButton && (
                <ArrowLeft onClick={() => {
                    navigate(-1)
                }} />
            )}
            <div className={styles.searchGroup}>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        className={styles.ipt}
                        placeholder="请输入想搜索的内容"
                        ref={queryRef}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        // 设置输入框的值
                        value={query}
                    />
                    <Close onClick={clearQuery} className={styles.Close} />
                </div>
                <div
                    onClick={query.trim() ? handleSearchClick : undefined}
                    className={query.trim() ? styles.searchBtnActive : styles.searchBtnDisabled}
                >
                    搜索
                </div>
            </div>
        </div>
    )
}

export default memo(SearchBox)
