import tokenStorage from '../../utils/services/tokenStorage';

function Home(){
    const user = tokenStorage.decodeToken().email;
    return(
        <div>Welcome to home page {user} !</div>
    )
}

export default Home;