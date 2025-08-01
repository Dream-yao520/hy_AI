import { useNavigate } from 'react-router-dom';
import SearchBox from '@/components/SearchBox';

const Home = () => {
    const navigate = useNavigate();

    // 空函数，用于满足SearchBox组件的props要求
    const emptyFunction = () => { };

    return (
        <div>
            <div
                onClick={() => navigate('/search')}  // 点击区域跳转
            >
                <SearchBox
                    handleQuery={emptyFunction}
                    onSearch={emptyFunction}
                    value={''}
                    showBackButton={false}  // 主页不显示返回按钮
                />
            </div>
        </div>
    );
};

export default Home;
