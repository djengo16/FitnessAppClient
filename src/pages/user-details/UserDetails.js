import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getUserById } from "../../utils/services/usersService";
import { hasPermision } from "../../utils/services/authService";
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
  const [permision, setPermision] = useState(false);

  useEffect(() => {
    setPermision(hasPermision(params.id));
    getUserById(params.id).then((response) => setUser(response.data));
    if (permision) {
      getUserWorkouts(params.id).then((response) => {
        response.data.forEach((plan, index) => {
          if (plan.isActive) {
            response.data[index] = response.data[0];
            response.data[0] = plan;
          }
        });

        setPlans(response.data);
      });
    }
  }, [params.id, permision]);

  return (
    <div className={styles["page"]}>
      <h4 className={pageStyles["page-title"]}>{user?.email}'s Details</h4>
      {permision && (
        <div
          className={tableStyles.scrollable}
          style={{ backgroundColor: "#EAE9E9" }}
        >
          <TableAlikeWrapper title="Work plans">
            {plans &&
              plans.map((plan) => {
                return (
                  <UserWorkoutCard key={plan.id} {...plan} userId={user.id} />
                );
              })}
          </TableAlikeWrapper>
        </div>
      )}
    </div>
  );
}
export default UserDetails;
