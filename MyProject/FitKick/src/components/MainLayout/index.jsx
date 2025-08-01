import {
    useState,
    useEffect
} from 'react';
import {
    Tabbar,
} from 'react-vant';
import {
    HomeO,
    BagO,
    LikeO,
    UserO,
    ChatO
} from '@react-vant/icons';
import {
    Outlet,
    useNavigate,
    useLocation
} from 'react-router-dom'

//菜单栏配置
const tabs = [
    { icon: <HomeO />, title: '首页', path: '/home' },
    { icon: <BagO />, title: '商品', path: '/product' },
    { icon: <LikeO />, title: '喜欢', path: '/like' },
    { icon: <ChatO />, title: '智能助手', path: '/chat' },
    { icon: <UserO />, title: '我的', path: '/user' },

]

const MainLayout = () => {
    const [active, setActive] = useState(0);
    const location = useLocation();
    useEffect(() => {
        // console.log(location.pathname);
        // es6的使用power 
        const index = tabs.findIndex((tab) => location.pathname.startsWith(tab.path));
        if (index !== -1) {
            setActive(index);
        }
    }, [location.pathname]);
    const navigate = useNavigate();
    return (
        <div
            className='flex flex-col h-screen'
            style={{ paddingBottom: '50px' }}
        >
            <div className='flex-1'>
                <Outlet />
            </div>
            {/* tabbar */}
            <Tabbar value={active} onChange={
                (key) => { setActive(key); navigate(tabs[key].path); }}
                activeColor='red' inactiveColor='#000'
            >
                {tabs.map((tab, index) => (
                    <Tabbar.Item
                        key={index}
                        icon={tab.icon}
                    >
                        {tab.title}
                    </Tabbar.Item>
                ))}
            </Tabbar>
        </div>
    )
}

export default MainLayout;