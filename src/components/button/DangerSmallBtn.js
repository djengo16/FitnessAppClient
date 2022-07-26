import styles from './button.module.css'

function DangerSamllBtn(props){
    return(
        <button onClick={props.action} className={styles['danger-btn-sm']}>{props.content}</button>
    )
}

export default DangerSamllBtn;