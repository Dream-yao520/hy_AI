import useTitle from '@/hooks/useTitle';
import {
    useState
} from 'react'
import {
    Image,
    Cell,
    CellGroup,
    ActionSheet,
    Popup,
    Loading,
    Grid,
    GridItem,
    Card,
} from 'react-vant';
import {
    ServiceO,
    FriendsO,
    StarO,
    SettingO,
    UserCircleO,
    CommentO,
    GuideO,
    ThumbCircleO,
    AddO,
    CartO,
    ChatO,
    FireO,
    LikeO,
    Search,
    HomeO,
    UserO,
} from '@react-vant/icons';
import styles from './account.module.css'
import { generateAvatar } from '@/llm';

const Account = () => {
    const gridData = [
        { icon: AddO, text: '添加' },
        { icon: CartO, text: '购物车' },
        { icon: ChatO, text: '聊天' },
        { icon: FireO, text: '热门' },
        { icon: LikeO, text: '喜欢' },
        { icon: StarO, text: '收藏' },
        { icon: Search, text: '搜索' },
        { icon: HomeO, text: '首页' },
        { icon: UserO, text: '我的' }
    ];
    const [userInfo, setUserInfo] = useState({
        nickname: '海绵宝宝',
        level: '100级',
        slogan: '我准备好了，我准备好了',
        avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    });
    useTitle('我的')
    const [showActionSheet, setShowActionSheet] = useState(false);
    const handleAction = async (e) => {
        // console.log(e)
        if (e.type === 1) {
            // AI生成头像
            const text = `昵称${userInfo.nickname}签名${userInfo.slogan}`
            const newAvatar = await generateAvatar(text);
            setUserInfo({
                ...userInfo,
                avatar: newAvatar,
            })
        } else if (e.type === 2) {
            // 上传头像
            setUserInfo({
                ...userInfo,
                avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/dog.jpeg',
            })
        }
    }
    const actions = [
        { name: 'AI生成头像', color: '#123123', type: 1 },
        { name: '上传头像', color: '#ee0a24', type: 2 },
    ]
    const features = [
        { icon: CommentO, name: '课程中心' },
        { icon: GuideO, name: '出行方式' },
        { icon: FriendsO, name: '我的圈子' },
        { icon: ThumbCircleO, name: '推荐美食' },
    ]
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image
                    round
                    width="64px"
                    height="64px"
                    style={{ cursor: 'pointer' }}
                    src={userInfo.avatar}
                    onClick={() => setShowActionSheet(true)}
                />
                <div className='ml4'>
                    <div className={styles.nickname}>昵称：{userInfo.nickname}</div>
                    <div className={styles.level}>等级：{userInfo.level}</div>
                    <div className={styles.slogan}>签名：{userInfo.slogan}</div>
                </div>
            </div>
            <div>
                <Card className='mt3' style={{ borderRadius: '8px', overflow: 'hidden' }}>
                    <CellGroup bordered={false}>
                        <Cell title="服务" icon={<ServiceO />} isLink />
                    </CellGroup>
                </Card>
                <Card className='mt2' style={{ borderRadius: '8px', overflow: 'hidden' }}>
                    <CellGroup bordered={false}>
                        <Cell title="收藏" icon={<StarO />} isLink />
                        <Cell title="朋友圈" icon={<FriendsO />} isLink />
                    </CellGroup>
                </Card>
                <Card className='mt2' style={{ borderRadius: '8px', overflow: 'hidden' }}>
                    <CellGroup bordered={false}>
                        <Cell title="设置" icon={<SettingO />} isLink />
                    </CellGroup>
                </Card>
            </div>
            <ActionSheet
                visible={showActionSheet}
                actions={actions}
                cancelText="取消"
                onCancel={() => setShowActionSheet(false)}
                onSelect={(e) => handleAction(e)}
            />
            <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>常用功能</div>
            <Grid border={false} columnNum={4}>
                {features.map((item, index) => (
                    <GridItem
                        key={index}
                        icon={<item.icon size="24px" />}
                        text={item.name}
                        onClick={() => console.log(`点击了${item.name}`)}
                    />
                ))}
            </Grid>
            <div className={styles.gridContainer}>
                {
                    gridData.map((item, index) => (
                        <div key={index} className={styles.gridItem}>
                            <div className={styles.gridIcon}>
                                <item.icon size="24px" />
                            </div>
                            <div className={styles.text}>{item.text}</div>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default Account
