import { useNavigate } from 'react-router-dom';
import SearchBox from '@/components/SearchBox';
import { useImageStore } from '@/store/useImageStore';
import { useEffect } from 'react';
import { Tabs } from 'react-vant';
import Waterfall from '@/components/Waterfall';
import styles from './home.module.css'
import { useHomeStore } from '@/store/useHomeStore';
import useTitle from '@/hooks/useTitle';


const Home = () => {
    // 主页标题FitKick
    useTitle('FitKick');
    const navigate = useNavigate();
    const { tabs,
        activeTab,
        setActiveTab,
    } = useHomeStore();
    // 空函数，用于满足SearchBox组件的props要求
    const emptyFunction = () => { };

    const { fetchMore, loading } = useImageStore();
    // 当activeTab变化时重新加载数据
    useEffect(() => {
        fetchMore(activeTab);
        // console.log('activeTab:', activeTab);
    }, [activeTab])

    // 点击tab切换时，设置当前激活的tab
    const handleTabClick = (index) => {
        const tab = tabs[index];
        setActiveTab(tab);
        // console.log('tab:', tab);
    }

    return (
        <div>
            <div
                className={styles.searchContainer}
                onClick={() => navigate('/search')}  // 点击区域跳转
            >
                <SearchBox
                    handleQuery={emptyFunction}
                    onSearch={emptyFunction}
                    value={''}
                    showBackButton={false}  // 主页不显示返回按钮
                />
            </div>
            <div className={styles.tabsContainer}>
                <Tabs activeKey={activeTab} onChange={handleTabClick}>
                    {tabs.map(item => (
                        <Tabs.TabPane key={item} title={item}>
                        </Tabs.TabPane>
                    ))}
                </Tabs>
            </div>
            <div
                className={styles.waterfallContainer}
            >
                <Waterfall
                    fetchMore={fetchMore}
                    loading={loading}
                    showSellerInfo={false}
                />
            </div>
        </div>
    );
};

export default Home;
