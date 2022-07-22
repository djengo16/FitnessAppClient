import { Link } from "react-router-dom"
import styles from './button.module.css'

const UserDetailsLinkBtn = (props) =>{
return (
    <Link to={props.url} className={`${styles['primary-btn-sm']} ${styles['primary-btn-link']}`}>{props.content}</Link>
)
}
export default UserDetailsLinkBtn;