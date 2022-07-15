import styles from './header.module.css'
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import {logout} from '../../../utils/services/authService'
export function Header() {
    const [navigate, setNavigate] = useState(false);

    let clickedElement;
    const handleClick = (event) =>{
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
                    <li><a><img src="/dumbell.svg" alt="" /></a></li>
                    <li ><a onClick={handleClick} href='/' >Home</a></li>
                    <li><a onClick={handleClick} href='/other'>Other</a></li>
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