import styles from './header.module.css'
import { Navigate, NavLink } from 'react-router-dom';
import { useState } from 'react';
import {logout} from '../../../utils/services/authService'
export function Header() {
    const [navigate, setNavigate] = useState(false);
    const handleNavClick = (isActive) => { 
        let activeStyle = {backgroundColor: ''};
        activeStyle.backgroundColor = isActive ? 'var(--primaryOp50)': 'transparent';
         return activeStyle;
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
                    <li ><NavLink exact to='/'><img src="/dumbell.svg" alt="" /></NavLink></li>
                    <li><NavLink  style={({ isActive }) => handleNavClick(isActive)} to='/'>Home</NavLink></li>
                    <li><NavLink   style={({ isActive }) => handleNavClick(isActive)} to='/users'>Users</NavLink></li>
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