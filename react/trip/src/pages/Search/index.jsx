import { useState, useEffect, memo } from 'react'
import { Tabs, Tag, Space, Divider } from 'react-vant';
import { ClockO, DeleteO, } from '@react-vant/icons';
import SearchBox from '@/components/SearchBox'
import { useSearchStore } from '@/store/useSearchStore';
import styles from './search.module.css'

const HotListItems = memo((props) => {
    console.log('HotListItems', props);
    const { hotList } = props;
    return (
        <div className={styles.hot}>
            <h1>热门推荐</h1>
            {
                hotList.map(item => (
                    <div className={styles.item} key={item.id}>
                        {item.city}
                    </div>
                ))
            }
        </div>
    )
})

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const { searchHistory, suggestList, setSuggestList, hotList, setHotList } = useSearchStore();
    // 单向数据流
    // 反复生成 useCallback
    // const handleQuery = (val) => {
    //     // api 请求
    //     setSearchValue(val);
    // }
    useEffect(() => {
        setHotList();
    }, [])
    const [searchValue, setSearchValue] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [isSearching, setIsSearching] = useState(false);
    const handleQuery = (query) => {
        //api 请求
        console.log('debounce之后', query)
        setQuery(query);
        if (!query) {
            return
        }
        setSuggestList(query);
    }
    // 添加最大历史记录数量常量
    const MAX_HISTORY_LENGTH = 20;
    // 添加历史记录点击事件处理函数
    const handleHistoryClick = (item) => {
        setSearchValue(item);
    };
    const suggestListStyle = {
        display: query === '' ? 'none' : 'block',
    }
    const [history, setHistory] = useState([]);
    const handleSearch = (val) => {
        setIsSearching(true);
        if (val) {
            // LRU缓存逻辑实现
            const newHistory = [...history];
            const index = newHistory.indexOf(val);

            // 如果已存在则移除原位置
            if (index !== -1) {
                newHistory.splice(index, 1);
            }
            // 如果达到最大长度则移除最后一项
            else if (newHistory.length >= MAX_HISTORY_LENGTH) {
                newHistory.pop();
            }

            // 添加到开头（最近使用）
            newHistory.unshift(val);
            setHistory(newHistory);
        }
        setSearchValue('');
        setTimeout(() => {
            setIsSearching(false);
        }, 1000);
    };
    const clearHistory = () => {
        setHistory([]);
    };

    const deleteHistoryItem = (index) => {
        const newHistory = [...history];
        newHistory.splice(index, 1);
        setHistory(newHistory);
    };
    return (
        <div style={{ padding: '16px' }} className='container'>
            {/* 搜索栏 */}
            <div className={styles.wrapper}>
                <SearchBox handleQuery={handleQuery} />
                {/* 维护性 */}
                <HotListItems hotList={hotList} />
            </div>
            <div className={styles.list} style={suggestListStyle}>
                {suggestList.map(item => (
                    <div key={item} className={styles.item}>
                        {item}
                    </div>
                ))}
            </div>
            {/* <Search
                leftIcon={<ArrowLeft onClick={handleBack} />}
                value={searchValue}
                onChange={setSearchValue}
                placeholder="请输入搜索关键词"
                onSearch={handleSearch}
                onCancel={() => setSearchValue('')}
                action={
                    <Button
                        disabled={isSearching}
                        type="primary"
                        size="small"
                        style={{ marginLeft: '8px' }}
                        onClick={() => handleSearch(searchValue)}
                    >
                        搜索
                    </Button>
                }
            /> */}

            {/* 分类标签 */}
            <div style={{ margin: '16px 0' }}>
                <Tabs active={activeTab} onChange={setActiveTab}>
                    <Tabs.TabPane title="综合" name="all" />
                    <Tabs.TabPane title="文章" name="article" />
                    <Tabs.TabPane title="图片" name="image" />
                    <Tabs.TabPane title="标签" name="tag" />
                    <Tabs.TabPane title="用户" name="user" />
                </Tabs>
            </div>

            {/* 搜索历史 */}
            <div style={{ marginTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>搜索历史</span>
                    <DeleteO fontSize="16px" onClick={clearHistory} />
                </div>

                <Space wrap>
                    {history.map((item, index) => (
                        <Tag
                            key={index}
                            round
                            type="primary"
                            plain
                            size="medium"
                            onClose={() => deleteHistoryItem(index)}
                            closeable
                            // 添加点击事件
                            onClick={() => handleHistoryClick(item)}
                            // 添加鼠标悬停样式
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

            <Divider>字节算法</Divider>
        </div>
    );
};

export default SearchPage
