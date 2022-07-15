import tokenStorage from '../../utils/services/tokenStorage';
import styles from './home.module.css'
function Home(){
    const user = tokenStorage.decodeToken().email;
    return(
        <div><h4 className={styles.header}>Welcome: {user} to FitnesApp!</h4></div>
    )
}

export default Home;