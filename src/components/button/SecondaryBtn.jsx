import styles from './button.module.css'

function SecondaryBtn(props){
    return(
        <button onClick={props.action} className={styles['secondary-btn']}>{props.content}</button>
    )
}

export default SecondaryBtn;