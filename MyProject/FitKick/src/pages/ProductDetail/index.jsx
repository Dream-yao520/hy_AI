import useDetailStore from '@/store/useDetailStore'
import { useLikeStore } from '@/store/useLikeStore'  // 导入useLikeStore
import {
    useParams,
    useLocation,
    useNavigate
} from 'react-router-dom'
import {
    memo,
    useEffect
} from 'react'
import {
    Skeleton,
    Swiper,
    Image
} from 'react-vant'
import useTitle from '@/hooks/useTitle'
import styles from './productDetail.module.css'
import {
    ArrowLeft,
    Like,
    ShopO,
    ServiceO,
    StarO,
    Logistics,
    Description,
    Passed
} from '@react-vant/icons';
import { useToastStore } from '@/store/useToastStore'
import { triggerBadgeUpdate } from '@/store/useBadgeStore'; // 导入徽章更新函数

const BottomBar = memo(({ onAddLike, isLiked }) => {  // 接收isLiked属性
    return (
        <div className={styles.bottomBar}>
            <div className={styles.left}>
                <div className={styles.iconBlock}>
                    <ShopO />
                    <span>店铺</span>
                </div>
                <div className={styles.iconBlock}>
                    <ServiceO />
                    <span>客服</span>
                </div>
                <div className={styles.iconBlock}>
                    <StarO />
                    <span>评价</span>
                </div>
            </div>
            <div className={styles.right}>
                <div
                    className={`${styles.cartBtn} ${isLiked ? styles.cancelLikeBtn : ''}`}
                    onClick={onAddLike}
                >
                    {isLiked ? '取消喜欢' : '加入喜欢'}
                </div>
                <div className={styles.buyBtn}>立即购买</div>
            </div>

        </div>
    )
})

const ProductDetail = () => {
    const { detail, loading, setDetail } = useDetailStore()
    const { addLikeProduct, removeLikeProduct, products } = useLikeStore()
    const { showToast } = useToastStore();
    const { id } = useParams()
    const navigate = useNavigate();
    const location = useLocation();
    // 从路由状态中获取点击的图片 URL
    const clickedImageUrl = location.state?.clickedImageUrl || '';

    useEffect(() => {
        // 传递商品 ID 和点击的图片 URL
        setDetail(id, clickedImageUrl)
    }, [id, clickedImageUrl])
    useEffect(() => {
        useTitle(detail?.title || '详情')
    }, [detail])
    // console.log(detail);
    // 处理加入喜欢/取消喜欢的点击事件
    const handleAddLike = () => {
        // 创建商品对象，使用原始ID
        const productId = detail.id || id;
        const productToAdd = {
            id: productId,
            name: detail.title,
            price: detail.price,
            size: Math.floor(Math.random() * (45 - 35 + 1)) + 35 + '码',
            image: clickedImageUrl || detail.images[0]?.url
        };

        // 检查商品是否已在喜欢列表中
        const isLiked = products.some(p => p.id === productId);

        if (isLiked) {
            // 移除喜欢
            removeLikeProduct(productId);
            showToast({
                message: '商品已从喜欢列表移除',
                type: 'warning',
            });
        } else {
            // 添加喜欢
            addLikeProduct(productToAdd);
            showToast({
                message: '商品已添加到喜欢列表',
                type: 'success',
            });
            // 触发徽章更新
            triggerBadgeUpdate();
        }
    }

    // 计算商品是否已被喜欢，使用原始ID
    const productId = detail.id || id;
    const isLiked = products.some(p => p.id === productId);

    if (loading) return <Skeleton />
    return (
        <>
            <nav className={styles.nav}>
                <ArrowLeft fontSize={36} onClick={() => navigate(-1)} />
                <Like fontSize={36} color={isLiked ? 'red' : 'black'} onClick={() => navigate('/like')} />
            </nav>
            {/* 幻灯片 */}
            <div className={styles.container}>
                <Swiper
                >
                    {
                        detail?.images.map((item, index) => (
                            <Swiper.Item key={index}>
                                <Image
                                    src={item.url}
                                    style={{
                                        width: '100%',
                                        height: '300px',
                                        objectFit: 'cover'
                                    }} />
                            </Swiper.Item>
                        ))
                    }
                </Swiper>
                {/* 商品信息 */}
                <div className={styles.priceRow}>
                    <div className={styles.price}>
                        ￥{detail?.price}
                    </div>
                    <div className={styles.couponBtn}>点击查看更多</div>
                </div>
                <div className={styles.titleRow}>
                    <span className={styles.tag}>IFASHION</span>
                    <span className={styles.title}>{detail?.title}</span>
                </div>
                <div className={styles.deliveryRow}>
                    <Logistics className={styles.icon} fontSize={30} />
                    <span className={styles.deliveryText}>
                        预计3小时内发货 | 承诺48小时内发货
                    </span>
                    <br />
                    <span className={styles.extraInfo}>河北保定 · 快递 · 免运费</span>
                </div>

                <div className={styles.row}>
                    <Passed className={styles.icon} />
                    <span>7天无理由退货</span>
                </div>
                <div className={styles.row}>
                    <Description className={styles.icon} />
                    <span>详情：{detail?.desc}</span>
                </div>

            </div>
            <BottomBar onAddLike={handleAddLike} isLiked={isLiked} />
        </>
    )
}

export default ProductDetail
