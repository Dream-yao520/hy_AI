import styles from './anotherbutton.module.css'



const AnotherButton = () => {
    console.log(styles);

    return (
        <>
            <button className={styles.button}>Another Button</button>
        </>
    )
}

export default AnotherButton