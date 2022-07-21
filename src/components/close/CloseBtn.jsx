import styles from './close-btn.module.css';

const CloseBtn = (props) => {
    return <a onClick={props.onClick} className={styles.close}/>
}
export default CloseBtn;