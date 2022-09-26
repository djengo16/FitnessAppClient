import { useEffect, useState } from "react";
import pageStyles from "../../styles/page.module.css";
import { useParams } from "react-router-dom";
import {
  getUserById,
  getUserWorkoutPlan,
} from "../../utils/services/usersService";
import WorkoutPlan from "../../components/workout-plan/WorkoutPlan";
import { buildWorkoutPlanColumns } from "../../utils/builders/tableColumnsBuilder";
import NotHaveProgram from "../../components/program-not-assigned/NotHaveProgram";
const UserWorkoutPlan = () => {
  const params = useParams();
  const [workoutPlan, setWorkoutPlan] = useState("");
  const [user, setUser] = useState("");
  //sets, reps

  useEffect(() => {
    getUserById(params.id).then((response) => setUser(response.data));
    getUserWorkoutPlan(params.id, params.planId).then((response) => {
      setWorkoutPlan(response.data);
    });
  }, [params.id, params.planId]);
  console.log(user);
  return (
    <div className={pageStyles["page"]}>
      {workoutPlan ? (
        <>
          <h4 className={pageStyles["page-title"]}>
            {user.firstName} {user.lastName}'s workout program
          </h4>
          <WorkoutPlan
            tableColumnsInfo={buildWorkoutPlanColumns("full")}
            workoutPlan={workoutPlan}
            for="user-plan"
          />
        </>
      ) : (
        <NotHaveProgram />
      )}
    </div>
  );
};
export default UserWorkoutPlan;
