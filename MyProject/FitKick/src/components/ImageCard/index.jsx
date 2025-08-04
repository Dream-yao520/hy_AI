import styles from './card.module.css'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate 钩子

const ImageCard = ({ url, height, id, sellerName, showSellerInfo = true }) => {
    const imgRef = useIntersectionObserver((entry, obs) => {
        const img = entry.target
        const oImg = document.createElement('img')
        oImg.src = img.dataset.src
        oImg.onload = () => {
            img.src = oImg.src
        }
        obs.unobserve(img)
    }, { once: true })

    const navigate = useNavigate(); // 创建 navigate 函数

    // 点击事件处理函数
    const handleClick = () => {
        // 提取商品 ID（假设 id 格式为 "tab-page-productId"）
        // 实际应用中可能需要根据实际数据结构调整
        const productId = id;
        navigate(`/detail/${productId}`, { state: { clickedImageUrl: url } });
    }

    return (
        <div style={{ height }} className={styles.card} onClick={handleClick}>
            <img ref={imgRef} data-src={url} className={styles.img} />
            {showSellerInfo && <div className={styles.sellerInfo}>{sellerName}</div>} {/* 条件渲染商家信息 */}
        </div>
    )
}

export default ImageCard
