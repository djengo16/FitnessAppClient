export function buildWorkoutPlanColumns(type) {
  const defaultColumns = [
    {
      title: "Exercise Name",
      field: "name",
      type: "cell",
      width: "40%",
    },
    {
      title: "Sets",
      field: "sets",
      type: "cell",
      width: "10%",
    },
    {
      title: "Min reps",
      field: "minReps",
      type: "cell",
      width: "10%",
    },
    {
      title: "Max reps",
      field: "maxReps",
      type: "cell",
      width: "10%",
    },
    {
      title: "Details",
      field: "details",
      dataField: "name",
      action: "createDetailsBtn",
      type: "button",
      width: "15%",
    },
  ];

  const userOperationColumns = [
    {
      title: "Remove from plan",
      field: "details",
      dataField: "name",
      action: "createRemoveBtn",
      type: "button",
      width: "15%",
    },
  ];

  switch (type) {
    case "full":
      return defaultColumns.concat(userOperationColumns);
    default:
      return defaultColumns;
  }
}

export function buildExerciseColumnsInAdminPage() {
  return [
    {
      title: "ID",
      field: "id",
      type: "cell",
      width: "10vw",
    },
    {
      title: "Exercise Name",
      field: "name",
      type: "cell",
      width: "30vw",
    },
    {
      title: "Muscle group",
      field: "muscleGroup",
      type: "cell",
      width: "30vw",
    },
    {
      title: "Action",
      field: "action",
      dataField: "id",
      action: "createEditAndDeleteBtn",
      type: "button",
      width: "30vw",
    },
  ];
}
