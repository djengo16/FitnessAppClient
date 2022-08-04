const errorMessages = {
  //authentication
  emptyEmail: "Email must not be empty!",
  invalidEmail: "Invalid email address!",
  emptyPassword: "Password must not be empty!",
  passwordMinLength: "Password must be at least 6 characters long!",
  passwordsMatch: "Passwords do NOT match!",

  //exercise creation
  exerciseNameRequired: "Exercise name is required!",
  muscleGroupIsRequired: "Muscle group name is required!",
  difficultyNameIsRequired: "Difficulty name is required!",

  //common
  invalidUrl: "Invalid url!",

  //workout plan personalization
  difficultyOptionIsRequired: "Difficulty option is required!",
  daysInRangeError: "Please choose between [3-5] days!",
  trainingDaysAreRequired: "Training days are required!",
  goalisRequired: "Goal is are required!",
  programsCountInRange: "Please choose between [1-10] plans!",
};

export default errorMessages;
