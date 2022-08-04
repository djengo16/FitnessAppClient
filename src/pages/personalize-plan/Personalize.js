import { useState } from "react";
import GeneratedPlans from "../../components/generated-plans-list/GeneratedPlans";
import PersonalizeForm from "../../components/personalize-form/PersonalizeForm";
import pageStyles from "../../styles/page.module.css";
import tokenStorage from "../../utils/services/tokenStorage";

const Personalize = () => {
  const userId = tokenStorage.decodeToken().nameid;

  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [isPersonalized, setPersonalized] = useState(false);

  const handleWorkoutPlans = (data) => {
    setWorkoutPlans(data);
    setPersonalized(true);
  };

  return (
    <div className={pageStyles["page"]}>
      <div>
        <h4 className={pageStyles["page-title"]}>Get a workout plan!</h4>
        {!isPersonalized ? (
          <PersonalizeForm userId={userId} onFormSubmit={handleWorkoutPlans} />
        ) : (
          <GeneratedPlans plans={workoutPlans} />
        )}
      </div>
    </div>
  );
};
export default Personalize;
