import tokenStorage from "../../utils/services/tokenStorage";
import pageStyles from "../../styles/page.module.css";

function Home() {
  const user = tokenStorage.decodeToken().email;
  return (
    <div className={pageStyles["page"]}>
      <h4 className={pageStyles["page-title"]}>
        Welcome to FitnessApp {user} !
      </h4>
    </div>
  );
}

export default Home;
