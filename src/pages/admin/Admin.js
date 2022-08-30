/* eslint-disable react-hooks/exhaustive-deps */
import pageStyles from "../../styles/page.module.css";
import styles from "./admin.module.css";
import { Fragment, useEffect, useRef, useState } from "react";
import { HEALTHY_STATUS } from "../../utils/constants";
import { getAppHelath } from "../../utils/services/apiService";
import AdminNav from "./AdminNav";
import { adminNavItems } from "../../utils/adminNavItems";
import StatusLabel from "../../components/status-label/StatusLabel";
import ExercisesInAdmin from "./ExercisesInAdmin";
import UsersInAdmin from "./UsersInAdmin";

function Admin() {
  const [searchParamsExercises, setSearchParamsExercises] = useState("");
  const [searchParamsUsers, setSearchParamsUsers] = useState("");

  const [apiStatus, setApiStatus] = useState("");
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [selectedNavItem, setSelectedNavItem] = useState("");

  //Keeps reference to searchbar's input
  const searchParamsInputRef = useRef();

  /* First mounting of the component triggers api call to health check endpoint and
    gets info if the App is Healthy or not, after that it does the same check every 
    10 minutes and updates the current status.
    We have this first render check here because of setInteral, which
    code will execute after 10 minutes for the first time, but we
    need this status info at the moment we open admin page.
    */
  useEffect(() => {
    if (isFirstRender) {
      setSelectedNavItem(adminNavItems.exercises);
      checkApiStatus();
      setIsFirstRender(false);
    }
    /* 1000 miliseconds * 60 seconds * 10 min = 10 minutes*/
    const intervalTime = 1000 * 60 * 10;
    const interval = setInterval(() => {
      checkApiStatus();
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const checkApiStatus = () => {
    getAppHelath().then((response) => {
      setApiStatus(response.data);
    });
  };

  //Navigation
  const handleNavClick = (value) => {
    setSelectedNavItem(value);
  };

  const handleSearchParams = (e) => {
    e.preventDefault();
    if (
      searchParamsInputRef &&
      searchParamsInputRef.current.value.trim() !== ""
    ) {
      //this will trigger child's useffect and then will set curr page to 1
      if (selectedNavItem === adminNavItems.exercises) {
        setSearchParamsExercises(searchParamsInputRef.current.value);
      } else {
        setSearchParamsUsers(searchParamsInputRef.current.value);
      }
    }
  };
  return (
    <Fragment>
      <div className={pageStyles["page"]}>
        <header className={styles["admin-header"]}>
          <h4 className={`${pageStyles["page-title"]}`}>Admin Panel</h4>
          <label className={styles["health-label"]}>
            Server status:
            <StatusLabel status={apiStatus} targetStatus={HEALTHY_STATUS} />
          </label>
        </header>
        <AdminNav
          onNavSelect={handleNavClick}
          setSelectedNavItem={setSelectedNavItem}
          selectedNavItem={selectedNavItem}
          handleSearchParams={handleSearchParams}
          searchParamsInputRef={searchParamsInputRef}
        />
        {selectedNavItem === adminNavItems.exercises && (
          <ExercisesInAdmin searchParams={searchParamsExercises} />
        )}
        {selectedNavItem === adminNavItems.users && (
          <UsersInAdmin searchParams={searchParamsUsers} />
        )}
      </div>
    </Fragment>
  );
}
export default Admin;
