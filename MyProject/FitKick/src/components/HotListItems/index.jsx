import { memo } from 'react'
import styles from './hotListItems.module.css'

const HotListItems = memo((props) => {
    const { hotList, onItemClick } = props;
    return (
        <div className={styles.hot}>
            <h1>热门鞋子推荐</h1>
            {hotList.map((item, index) => (
                <div
                    className={styles.item}
                    key={item.id}
                    onClick={() => onItemClick(item.name)}
                >
                    <span className={styles.rank}>{index + 1}.</span>
                    {item.name}
                </div>
            ))}
        </div>
    )
})
export default HotListItems;
