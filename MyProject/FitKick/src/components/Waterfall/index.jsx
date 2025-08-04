import styles from './waterfall.module.css'
import ImageCard from '@/components/ImageCard'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { useImageStore } from '@/store/useImageStore'
import Loading from '@/components/Loading'

const Waterfall = ({ fetchMore, loading, showSellerInfo }) => { // 添加showSellerInfo参数
    const loaderRef = useIntersectionObserver((entry) => {
        if (entry.isIntersecting) {
            fetchMore();
        }
    })

    // 直接从 store 获取分配后的图片数组
    const { leftImages, rightImages } = useImageStore();


    return (
        <div className={styles.wrapper}>
            <div className={styles.column}>
                {leftImages.map((img) => (
                    <ImageCard key={img.id} {...img} showSellerInfo={showSellerInfo} /> // 传递showSellerInfo
                ))}
            </div>
            <div className={styles.column}>
                {rightImages.map((img) => (
                    <ImageCard {...img} key={img.id} showSellerInfo={showSellerInfo} /> // 传递showSellerInfo
                ))}
            </div>
            <div ref={loaderRef} className={styles.loader}>
                {loading && <Loading />}
            </div>
        </div>
    )
}

export default Waterfall