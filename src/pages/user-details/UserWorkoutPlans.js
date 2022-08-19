import TableAlikeWrapper from "../../components/table/TableAlikeWrapper";
import UserWorkoutCard from "../../components/user-workout-card/UserWorkoutCard";
import tableStyles from "../../styles/table.module.css";
import { getUserWorkouts } from "../../utils/services/workoutsService";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NotHaveProgram from "../../components/program-not-assigned/NotHaveProgram";
const UserWorkoutPlans = ({ user }) => {
  const params = useParams();
  const [plans, setPlans] = useState();
  console.log(params);
  useEffect(() => {
    getUserWorkouts(params.id).then((response) => {
      response.data.forEach((plan, index) => {
        if (plan.isActive) {
          response.data[index] = response.data[0];
          response.data[0] = plan;
        }
      });

      setPlans(response.data);
    });
  }, []);
  return (
    <div
      className={tableStyles.scrollable}
      style={{ backgroundColor: "#EAE9E9" }}
    >
      <TableAlikeWrapper title="Work plans">
        {plans ? (
          plans.map((plan) => {
            return (
              <UserWorkoutCard key={plan.id} {...plan} userId={params.id} />
            );
          })
        ) : (
          <NotHaveProgram />
        )}
      </TableAlikeWrapper>
    </div>
  );
};

export default UserWorkoutPlans;
