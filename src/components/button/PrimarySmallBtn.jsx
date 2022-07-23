import styles from './button.module.css'

function PrimarySmallBtn(props){
    return(
        <button onClick={props.action} className={styles['primary-btn-sm']}>{props.content}</button>
    )
}

export default PrimarySmallBtn;