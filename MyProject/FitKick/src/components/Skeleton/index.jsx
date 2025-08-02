import styles from './skeleton.module.css'

const Skeleton = ({ height }) => {
    return (
        <div style={{ height }} className={styles.skeleton}>
            <div className={styles.skeletonImage}></div>
        </div>
    )
}

export default Skeleton