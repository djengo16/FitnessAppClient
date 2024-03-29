const toastMessages = {
  exerciseAdded: (name) => `${name} added successfully to your training day!`,
  exerciseAlreadyAddded: "Exercise is already in your training day!",
  exerciseRemoved: "Successfully removed exercise from plan!",
  exerciseDeleted: "Successfully deleted exercise!",
  exerciseCreated: "Successfully created exercise!",
  exerciseUpdated: "Successfully updated exercise!",
  assignedProgram: "You succefully assigned program!",
  updatedUser: "Successfully updated your profile!",
  updatedProfilePicture: "Successfully updated your profile picture!",
  changedPassword: "Successfully changed your password!",
  updatedSetsAndReps: "Successfully updated exercise's sets and reps!",
  messageTooLong: "Your message is too long!",

  //roles
  updatedRole: (user) => `${user}'s role was updated!`,
};

const severityTypes = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error",
};

export { toastMessages, severityTypes };
