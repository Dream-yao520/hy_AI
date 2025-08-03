import useTitle from '@/hooks/useTitle';
import {
    useRef
} from 'react'
import {
    Image,
    Cell,
    CellGroup,
    ActionSheet,
    Grid,
    GridItem,
    Card,
} from 'react-vant';
import {
    ServiceO,
    ManagerO,
    SettingO,
    PendingPayment,
    Logistics,
    FreePostage,
    OtherPay,
    GoldCoinO,
    LocationO,
} from '@react-vant/icons';
import styles from './userProfile.module.css'
import { useNavigate } from 'react-router-dom'
import { useLoginStore } from '@/store/useLoginStore';
import useUserProfileStore from '@/store/useUserProfileStore';
import { generateAvatar } from '@/llm';

const Account = () => {
    const { isLogin, logout } = useLoginStore();
    const navigate = useNavigate();
    const { userInfo, showActionSheet, setUserInfo, setShowActionSheet, generateNewAvatar } = useUserProfileStore();
    useTitle('我的')
    // 使用useRef替代useState来管理文件输入框引用
    const fileInputRef = useRef(null);
    const handleLogout = () => {
        logout();
    }
    const handleLogin = () => {
        navigate('/login');
    }
    const handleAction = async (e) => {
        // console.log(e)
        if (e.type === 1) {
            // AI生成头像
            const text = `昵称${userInfo.nickname}签名${userInfo.slogan}`
            await generateNewAvatar(text);
        } else if (e.type === 2) {
            // 上传头像：触发文件选择对话框
            if (fileInputRef) {
                fileInputRef.current.click();
            }
        }
    }
    // 添加隐藏的文件输入框
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // 检查文件类型
            if (!file.type.startsWith('image/')) {
                alert('请选择图片文件');
                return;
            }
            // 读取文件并显示预览
            const reader = new FileReader();
            reader.onload = (e) => {
                setUserInfo({
                    ...userInfo,
                    avatar: e.target.result,
                });
                setShowActionSheet(false);
            };
            reader.readAsDataURL(file);
        }
    }
    const actions = [
        { name: 'AI生成头像', color: '#123123', type: 1 },
        { name: '上传头像', color: '#ee0a24', type: 2 },
    ]
    const features = [
        { icon: PendingPayment, name: '待付款' },
        { icon: FreePostage, name: '待发货' },
        { icon: Logistics, name: '待收货' },
        { icon: OtherPay, name: '待评价' },
        { icon: GoldCoinO, name: '退款售后' },
    ]
    const IconStyle = { width: '20px', height: '20px' };
    const gridData = [
        { icon: <svg style={IconStyle}><use xlinkHref="#icon-liwuhuodong"></use></svg>, text: '活动' },
        { icon: <svg style={IconStyle}><use xlinkHref="#icon-youhui"></use></svg>, text: '优惠' },
        { icon: <svg style={IconStyle}><use xlinkHref="#icon-chaxun"></use></svg>, text: '查询' },
        { icon: <svg style={IconStyle}><use xlinkHref="#icon-qiandao"></use></svg>, text: '签到' },
        { icon: <svg style={IconStyle}><use xlinkHref="#icon-choujiang"></use></svg>, text: '抽奖' },
        { icon: <svg style={IconStyle}><use xlinkHref="#icon-wodezuji"></use></svg>, text: '足迹' },
        { icon: <svg style={IconStyle}><use xlinkHref="#icon-shuju"></use></svg>, text: '数据' },
        { icon: <svg style={IconStyle}><use xlinkHref="#icon-kefu"></use></svg>, text: '客服' },
        { icon: <svg style={IconStyle}><use xlinkHref="#icon-guanyu"></use></svg>, text: '关于' },
    ]
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                {isLogin ? (
                    <>
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
                    </>
                ) : (
                    <>
                        <Image
                            round
                            width="64px"
                            height="64px"
                            style={{ cursor: 'pointer' }}
                            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" // 默认头像路径
                        />
                        <div className='ml4'>
                            <div className={styles.nickname}>未登录</div>
                            <div className={styles.level}>等级：--</div>
                            <div className={styles.slogan}>请登录以查看详细信息</div>
                        </div>
                    </>
                )}
            </div>
            <div>
                <Card className='mt3' style={{ borderRadius: '8px', overflow: 'hidden' }}>
                    <CellGroup bordered={false}>
                        <Cell title="服务" icon={<ServiceO />} isLink />
                    </CellGroup>
                </Card>
                <Card className='mt2' style={{ borderRadius: '8px', overflow: 'hidden' }}>
                    <CellGroup bordered={false}>
                        <Cell title="身份认证" icon={<ManagerO />} isLink />
                        <Cell title="地址" icon={<LocationO />} isLink />
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
            <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <div className={styles.orderContainer}>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>订单</div>
                <Grid border={false} columnNum={5}>
                    {features.map((item, index) => (
                        <GridItem
                            key={index}
                            icon={<item.icon size="24px" />}
                            text={item.name}
                        />
                    ))}
                </Grid>
            </div>
            <div className={styles.gridContainer}>
                {
                    gridData.map((item, index) => (
                        <div key={index} className={styles.gridItem}>
                            <div className={styles.gridIcon}>
                                {item.icon}
                            </div>
                            <div className={styles.text}>{item.text}</div>
                        </div>
                    ))
                }
            </div>
            <div className={styles.buttonContainer} >
                {isLogin ? (
                    <button
                        className={styles.logout + ' ' + styles.button}
                        onClick={handleLogout}
                    >
                        登出
                    </button>
                ) : (
                    <button
                        className={styles.login + ' ' + styles.button}
                        onClick={handleLogin}
                    >
                        登录
                    </button>
                )}
            </div>
        </div>

    )
}

export default Account
