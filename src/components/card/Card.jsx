import styles from "./card.module.css";

export default function Card(props){
    return(
        <div className={`${styles['card-wrapper']} ${props.className} ${styles[props.type]}` }>
            {props.children}
        </div>
    )
}