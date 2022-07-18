import tokenStorage from '../../utils/services/tokenStorage';
import styles from './home.module.css'
import headingStyles from '../../styles/headings.module.css'
function Home(){
    const user = tokenStorage.decodeToken().email;
    return(
        <div className={styles['home-page']}><h4 className={headingStyles['page-title']}>Welcome: {user} to FitnesApp!</h4></div>
    )
}

export default Home;