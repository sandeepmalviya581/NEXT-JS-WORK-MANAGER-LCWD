import styles from './Home.module.css'; // Import your CSS module

const Loader = () => (
    <div className={`${styles.loaderContainer} ${styles.blur}`}>
        <div className={styles.loader}></div>
    </div>
)

export default Loader;