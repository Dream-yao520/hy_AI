import { useEffect } from 'react'
import { Tag, Space } from 'react-vant';
import { ClockO, DeleteO, } from '@react-vant/icons';
import SearchBox from '@/components/SearchBox'
import { useSearchStore } from '@/store/useSearchStore';
import styles from './search.module.css'
import HotListItems from '@/components/HotListItems';

const SearchPage = () => {
    const {
        query,
        searchHistory,
        suggestList,
        hotList,
        setQuery,
        setSuggestList,
        handleSearch,
        clearHistory,
        deleteHistoryItem,
        setHotList
    } = useSearchStore();

    useEffect(() => {
        setHotList();
    }, [setHotList])

    const handleQuery = (query) => {
        setQuery(query);
        if (!query) {
            return;
        }
        setSuggestList(query);
    }

    const suggestListStyle = {
        display: query === '' ? 'none' : 'block',
    }

    // 处理热门鞋子点击
    const handleHotItemClick = (name) => {
        setQuery(name);
        handleSearch(name);
    }

    // 处理搜索历史点击（修改现有函数）
    const enhancedHandleHistoryClick = (item) => {
        setQuery(item);
        handleSearch(item);
    }

    return (
        <div className={styles.container}>
            {/* 搜索栏 */}
            <div className={styles.searchWrapper}>
                <SearchBox
                    handleQuery={handleQuery}
                    onSearch={handleSearch}
                    value={query}
                    autoFocus={true}  // 搜索页面自动聚焦
                />
            </div>
            {/* 搜索历史和热门推荐 - 仅当query为空时显示 */}
            {query === '' && (
                <div className={styles.contentWrapper}>
                    {/* 搜索历史 */}
                    <div style={{ marginTop: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <span style={{ fontSize: '16px', fontWeight: '500' }}>搜索历史</span>
                            <DeleteO fontSize="16px" onClick={clearHistory} />
                        </div>

                        <Space wrap>
                            {searchHistory.map((item) => (
                                <Tag
                                    key={item}
                                    round
                                    type="primary"
                                    plain
                                    size="medium"
                                    onClose={() => deleteHistoryItem(searchHistory.indexOf(item))}
                                    closeable
                                    onClick={() => enhancedHandleHistoryClick(item)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Space>
                                        <ClockO fontSize="14px" />
                                        {item}
                                    </Space>
                                </Tag>
                            ))}
                        </Space>
                    </div>
                    <div className={styles.wrapper}>
                        {/* 在 SearchPage 组件中使用 HotListItems 时传递 onItemClick 回调 */}
                        <HotListItems hotList={hotList} onItemClick={handleHotItemClick} />
                    </div>
                </div>
            )}
            {/* 搜索建议列表 - 当query不为空时全屏显示 */}
            <div className={styles.list} style={suggestListStyle}>
                {suggestList.map(item => (
                    <div key={item} className={styles.item}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage
