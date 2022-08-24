export function buildWorkoutPlanColumns(type) {
  const defaultColumns = [
    {
      title: "Exercise Name",
      field: "name",
      type: "cell",
      width: "30%",
    },
    {
      title: "Sets",
      field: "sets",
      type: "cell",
      width: "15%",
    },
    {
      title: "Min reps",
      field: "minReps",
      type: "cell",
      width: "15%",
    },
    {
      title: "Max reps",
      field: "maxReps",
      type: "cell",
      width: "15%",
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
      title: "Exercise Name",
      field: "name",
      type: "cell",
      width: "30%",
    },
    {
      title: "Sets",
      field: "sets",
      type: "numeric-editable",
      width: "15%",
    },
    {
      title: "Min reps",
      field: "minReps",
      type: "numeric-editable",
      width: "15%",
    },
    {
      title: "Max reps",
      field: "maxReps",
      type: "numeric-editable",
      width: "15%",
    },
    {
      title: "Details",
      field: "details",
      dataField: "name",
      action: "createDetailsBtn",
      type: "button",
      width: "15%",
    },
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
      return userOperationColumns;
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
export function buildExerciseColumnsInUserPage() {
  return [
    {
      title: "ID",
      field: "id",
      type: "cell",
      width: "10%",
    },
    {
      title: "Exercise Name",
      field: "name",
      type: "cell",
      width: "30%",
    },
    {
      title: "Muscle group",
      field: "muscleGroup",
      type: "cell",
      width: "20%",
    },
    {
      title: "Difficulty",
      field: "difficulty",
      type: "cell",
      width: "20%",
    },
    {
      title: "Action",
      field: "action",
      dataField: "id",
      action: "createAddAndDetailsBtn",
      type: "button",
      width: "20%",
    },
  ];
}

export function buildUserColumns() {
  return [
    {
      title: "ID",
      field: "id",
      type: "cell", //cell/button (options),
      width: "50vw", //(some size -> px, %, rem...),
    },
    {
      title: "Email",
      field: "email",
      type: "cell", //cell/button (options),
      width: "30vw", //(some size -> px, %, rem...),
    },
    {
      title: "Action",
      field: "action",
      dataField: "id", //since we need user id for this action we add one extra property
      action: "createUserDetailsBtn", //this property will help when creating the button
      type: "button", //cell/button (options),
      width: "20vw", //(some size -> px, %, rem...),
    },
  ];
}

export function buildUserColumnInAdminPanel() {
  return [
    {
      title: "ID",
      field: "id",
      type: "cell", //cell/button (options),
      width: "30%", //(some size -> px, %, rem...),
    },
    {
      title: "Email",
      field: "email",
      type: "cell", //cell/button (options),
      width: "20%", //(some size -> px, %, rem...),
    },
    {
      title: "Role",
      field: "role",
      options: ["User", "Administrator"],
      dataField: "id",
      type: "dropdown-editable", //cell/button (options),
      width: "30%", //(some size -> px, %, rem...),
    },
    {
      title: "Action",
      field: "action",
      dataField: "id", //since we need user id for this action we add one extra property
      action: "createUserDetailsBtn", //this property will help when creating the button
      type: "button", //cell/button (options),
      width: "10%", //(some size -> px, %, rem...),
    },
  ];
}
