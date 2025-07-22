import styles from './box.module.css'  // css in js
import {
    useState,
} from 'react'

const Box = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Close' : 'Open'}
            </button>
            <div className={`${styles.box} ${isOpen ? styles.open : ''}`}></div>
        </div>

    )
}

export default Box