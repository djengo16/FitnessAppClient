import styles from './button.module.css'

function DangerBtn(props){
    return(
        <button onClick={props.action} className={styles['danger-btn']}>{props.content}</button>
    )
}

export default DangerBtn;