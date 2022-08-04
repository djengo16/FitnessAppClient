import { useEffect, useState } from "react";
import pageStyles from "../../styles/page.module.css";
import { useParams } from "react-router-dom";
import {
  getUserById,
  getUserWorkoutPlan,
} from "../../utils/services/usersService";
import WorkoutPlan from "../../components/workout-plan/WorkoutPlan";
import tokenStorage from "../../utils/services/tokenStorage";
const UserWorkoutPlan = () => {
  const params = useParams();
  const userEmail = tokenStorage.decodeToken().email;
  const [workoutPlan, setWorkoutPlan] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    getUserById(params.id).then((response) => setUser(response.data));
    getUserWorkoutPlan(params.id, params.planId).then((response) => {
      setWorkoutPlan(response.data);
      console.log(response);
    });
  }, [params.id, params.planId]);

  return (
    <div className={pageStyles["page"]}>
      <h4 className={pageStyles["page-title"]}>
        {user.email}'s Workout program
      </h4>
      {workoutPlan && <WorkoutPlan workoutPlan={workoutPlan} />}
    </div>
  );
};
export default UserWorkoutPlan;
