import styles from './waterfall.module.css'
import {
    useRef,
    useEffect
} from 'react'
import ImageCard from '@/components/ImageCard'

const Waterfall = ({ images, fetchMore, loading }) => {
    const loader = useRef(null);
    useEffect(() => {
        // ref 出现在视窗了 intersectionObserver
        // 观察者模式
        const observer = new IntersectionObserver(([entry], obs) => {
            console.log(entry)
            if (entry.isIntersecting) {
                fetchMore();
            }
            // obs.unobserve(entry.target)
        })
        if (loader.current) {
            observer.observe(loader.current);
        }
        return () => observer.disconnect()
    }, [])
    return (
        <div className={styles.wrapper}>
            <div className={styles.column}>
                {
                    images.filter((_, i) => i % 2 === 0).map((img) => {
                        return <ImageCard key={img.id} {...img} />
                    })
                }
            </div>
            <div className={styles.column}>
                {
                    images.filter((_, i) => i % 2 !== 0).map((img) => {
                        return <ImageCard {...img} key={img.id} />
                    })
                }
            </div>
            <div ref={loader} className={styles.loader}>
                {loading && '加载中...'}
            </div>
        </div>
    )
}

export default Waterfall