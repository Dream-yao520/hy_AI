import useDetailStore from '@/store/useDetailStore'
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
    Cart,
    ShopO,
    ServiceO,
    StarO,
    Logistics,
    LikeO,
    Description,
} from '@react-vant/icons';

const BottomBar = memo(() => {
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
                <div className={styles.cartBtn}>加入喜欢</div>
                <div className={styles.buyBtn}>立即购买</div>
            </div>

        </div>
    )
})

const ProductDetail = () => {
    const { detail, loading, setDetail } = useDetailStore()
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
    if (loading) return <Skeleton />
    return (
        <>
            <nav className={styles.nav}>
                <ArrowLeft fontSize={36} onClick={() => navigate(-1)} />
                <Cart fontSize={36} />
            </nav>
            {/* 幻灯片 */}
            <div className={styles.container}>
                <Swiper
                // className={styles.swiper}
                // pagination={{ clickable: true }}
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
                    <div className={styles.couponBtn}>登录查看更多</div>
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
                    <LikeO className={styles.icon} />
                    <span>7天无理由退货</span>
                </div>
                <div className={styles.row}>
                    <Description className={styles.icon} />
                    <span>鞋型：厚底波浪底（参考Nike Air Y2K）+ 流线型金属质感骨架</span>
                </div>

            </div>
            <BottomBar />
        </>
    )
}

export default ProductDetail
