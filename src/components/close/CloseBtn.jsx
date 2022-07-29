import styles from './close-btn.module.css';

const CloseBtn = (props) => {
    return <div onClick={props.onClick} className={styles["close-wrap"]}><a  className={styles.close}/></div>
}
export default CloseBtn;