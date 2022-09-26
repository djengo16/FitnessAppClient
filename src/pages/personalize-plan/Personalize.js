import { useContext, useState } from "react";
import GeneratedPlans from "../../components/generated-plans-list/GeneratedPlans";
import PersonalizeForm from "../../components/personalize-form/PersonalizeForm";
import UserContext from "../../context/user-context";
import pageStyles from "../../styles/page.module.css";
import { tokenStorage } from "../../utils/services/storageService";

const Personalize = () => {
  const [{ userId }] = useContext(UserContext);

  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [isPersonalized, setPersonalized] = useState(false);

  const handleWorkoutPlans = (data) => {
    setWorkoutPlans(data);
    setPersonalized(true);
  };

  const personalizeTitle = isPersonalized ? (
    <h4 className={pageStyles["page-title"]}>Choose a workout plan!</h4>
  ) : (
    <h4 className={pageStyles["page-title"]}>Get a workout plan!</h4>
  );

  return (
    <div className={pageStyles["page"]}>
      <div>
        {personalizeTitle}
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
