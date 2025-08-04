import {
    useState,
    useEffect
} from 'react';
import {
    Tabbar,
} from 'react-vant';
import {
    Outlet,
    useNavigate,
    useLocation
} from 'react-router-dom'
import { useBadgeStore } from '@/store/useBadgeStore'; // 导入徽章状态管理

//菜单栏配置
// 提取重复的样式为常量
const IconStyle = { width: '22px', height: '22px' };

const tabs = [
    { icon: <svg style={IconStyle}><use xlinkHref="#icon-shouye"></use></svg>, title: '首页', path: '/home' },
    { icon: <svg style={IconStyle}><use xlinkHref="#icon-shangpin"></use></svg>, title: '商品', path: '/product' },
    { icon: <svg style={IconStyle}><use xlinkHref="#icon-xihuan"></use></svg>, title: '喜欢', path: '/like' },
    { icon: <svg style={IconStyle}><use xlinkHref="#icon-activeStatenamexuanzhong-2"></use></svg>, title: '智能助手', path: '/chat' },
    { icon: <svg style={IconStyle}><use xlinkHref="#icon-wode1"></use></svg>, title: '我的', path: '/user' },
]

const MainLayout = () => {
    const [active, setActive] = useState(0);
    const location = useLocation();
    const { newLikeCount } = useBadgeStore(); // 获取新喜欢商品数量
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
                        badge={tab.path === '/like' && newLikeCount > 0 ? { content: newLikeCount } : undefined} // 只在喜欢标签且有新喜欢时显示徽章
                    >
                        {tab.title}
                    </Tabbar.Item>
                ))}
            </Tabbar>
        </div>
    )
}

export default MainLayout;