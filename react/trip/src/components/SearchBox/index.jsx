import {
    ArrowLeft,
    Close,
} from '@react-vant/icons'
import { memo, useRef, useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './search.module.css'
import { debounce } from '@/utils'

const SearchBox = (props) => {
    // /api
    // 单项数据流
    // 子父通信
    const [query, setQuery] = useState('')
    const { handleQuery } = props
    // 非受控组件
    const queryRef = useRef(null);
    const displayStyle = {
        display: query ? 'block' : 'none',
    }
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
    // const handleQueryDebounce = debounce(handleQuery, 500)
    // 2. useMemo 缓存debounce的结果 否则会反复执行
    const handleQueryDebounce = useMemo(() => {
        return debounce(handleQuery, 300)
    }, [])
    useEffect(() => {
        // 防抖之前
        console.log('query', query)
        handleQueryDebounce(query);
    }, [query])
    return (
        <div className={styles.wrapper}>
            <ArrowLeft onClick={() => {
                navigate(-1)
            }} />
            <input
                type="text"
                className={styles.ipt}
                placeholder="搜素旅游相关"
                ref={queryRef}
                onChange={
                    handleChange
                }
            />
            {/* 移动端用户体验 */}
            <Close onClick={clearQuery} style={displayStyle} />
        </div>
    )
}

export default memo(SearchBox)
