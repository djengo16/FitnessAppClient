import { Link } from "react-router-dom"
import styles from './button.module.css'

const UserDetailsButton = (props) =>{
return (
    <Link to={`/users/${props.id}`} className={styles['user-details-btn']}>{props.content}</Link>
)
}
export default UserDetailsButton;