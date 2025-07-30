import styles from './card.module.css'
import {
    useRef,
    useEffect
} from 'react'

const ImageCard = ({ url, height }) => {
    const imgRef = useRef(null)
    useEffect(() => {
        const observer = new IntersectionObserver(([entry], obs) => {
            if (entry.isIntersecting) {
                const img = entry.target
                const oImg = document.createElement('img')
                oImg.src = img.dataset.src
                oImg.onload = () => {
                    img.src = oImg.src
                }
                obs.unobserve(img)
            }
        })
        if (imgRef.current) {
            observer.observe(imgRef.current)
        }
    }, [])
    return (
        <div style={{ height }} className={styles.card}>
            <img ref={imgRef} data-src={url} className={styles.img} />
        </div>
    )
}

export default ImageCard
