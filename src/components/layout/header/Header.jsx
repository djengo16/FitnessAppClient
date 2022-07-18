import styles from './header.module.css'
import { Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import {logout} from '../../../utils/services/authService'
export function Header() {
    const [navigate, setNavigate] = useState(false);

    let clickedElement;
    const handleNavClick = (event) =>{
        event.preventDefault();
        if(clickedElement){
            clickedElement.classList.remove(styles['active']);
        }
        event.target.classList.add(styles['active']);
        clickedElement = event.target;
    }

    const handleLogout = (evenet) => {
        logout();
        setNavigate(true);
    }

    return (
        <div className={styles.navbar}>
            {navigate && <Navigate to="/login" />}
            <div>
                <ul>
                    <li><Link to='/'><img src="/dumbell.svg" alt="" /></Link></li>
                    <li ><Link  to='/'>Home</Link></li>
                    <li><Link to='/users'>Users</Link></li>
                </ul>
            </div>
            <div>
                <div className={styles.dropdown}>
                    <a href="#"><img src="/user-icon.svg" alt="" /></a>
                    <div>
                        <a onClick={handleLogout}>Logout</a>
                    </div>
                </div>
            </div>
        </div>
    )
}