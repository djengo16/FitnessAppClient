import styles from "./card.module.css";

export default function Card(props){
    return(
        <div className={`${styles['card-wrapper']} ${props.className}` }>
            {props.children}
        </div>
    )
}