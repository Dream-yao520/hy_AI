import styles from './card.module.css'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'

const ImageCard = ({ url, height }) => {
    const imgRef = useIntersectionObserver((entry, obs) => {
        const img = entry.target
        const oImg = document.createElement('img')
        oImg.src = img.dataset.src
        oImg.onload = () => {
            img.src = oImg.src
        }
        obs.unobserve(img)
    }, { once: true })

    return (
        <div style={{ height }} className={styles.card}>
            <img ref={imgRef} data-src={url} className={styles.img} />
        </div>
    )
}

export default ImageCard
