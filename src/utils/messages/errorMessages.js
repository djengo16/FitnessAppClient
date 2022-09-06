const errorMessages = {
  //authentication
  emptyEmail: "Email must not be empty!",
  invalidEmail: "Invalid email address!",
  firstNameRequired: "First name is required!",
  lastNameRequired: "Last name is required!",
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

  //user
  invalidFirstName: "First Name cannot contain special characters!",
  invalidLastName: "Last Name cannot contain special characters!",
  invalidPhoneNumber: "Invalid phone number!",
};

export default errorMessages;
