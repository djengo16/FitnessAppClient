import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../utils/services/usersService";
import pageStyles from "../../styles/page.module.css";
import tableStyles from "../../styles/table.module.css";
import styles from "../../styles/page.module.css";
import TableAlikeWrapper from "../../components/table/TableAlikeWrapper";
import { getUserWorkouts } from "../../utils/services/workoutsService";
import UserWorkoutCard from "../../components/user-workout-card/UserWorkoutCard";
function UserDetails() {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    getUserById(params.id).then((response) => setUser(response.data));
    getUserWorkouts(params.id).then((response) => {
      setPlans(response.data);
      console.log(response.data);
    });
  }, [params.id]);
  return (
    <div className={styles["page"]}>
      <h4 className={pageStyles["page-title"]}>{user?.email}'s Details</h4>
      <div
        className={tableStyles.scrollable}
        style={{ backgroundColor: "#EAE9E9" }}
      >
        <TableAlikeWrapper title="Work plans">
          {plans &&
            plans.map((plan) => {
              return <UserWorkoutCard key={plan.id} {...plan} />;
            })}
          {plans &&
            plans.map((plan) => {
              return <UserWorkoutCard key={plan.id} {...plan} />;
            })}
          {plans &&
            plans.map((plan) => {
              return <UserWorkoutCard key={plan.id} {...plan} />;
            })}
          {plans &&
            plans.map((plan) => {
              return <UserWorkoutCard key={plan.id} {...plan} />;
            })}
        </TableAlikeWrapper>
      </div>
    </div>
  );
}
export default UserDetails;
