import { columnTypes } from "../constants";

export function buildWorkoutPlanColumns(type) {
  const defaultColumns = [
    {
      title: "Exercise Name",
      field: "name",
      type: columnTypes.cell,
      width: "30%",
    },
    {
      title: "Sets",
      field: "sets",
      type: columnTypes.cell,
      width: "15%",
    },
    {
      title: "Min reps",
      field: "minReps",
      type: columnTypes.cell,
      width: "15%",
    },
    {
      title: "Max reps",
      field: "maxReps",
      type: columnTypes.cell,
      width: "15%",
    },
    {
      title: "Details",
      field: "details",
      dataField: "name",
      action: "createDetailsBtn",
      type: columnTypes.button,
      width: "15%",
    },
  ];

  const userOperationColumns = [
    {
      title: "Exercise Name",
      field: "name",
      type: columnTypes.cell,
      width: "30%",
    },
    {
      title: "Sets",
      field: "sets",
      type: columnTypes.numericEditable,
      width: "15%",
    },
    {
      title: "Min reps",
      field: "minReps",
      type: columnTypes.numericEditable,
      width: "15%",
    },
    {
      title: "Max reps",
      field: "maxReps",
      type: columnTypes.numericEditable,
      width: "15%",
    },
    {
      title: "Details",
      field: "details",
      dataField: "name",
      action: "createDetailsBtn",
      type: columnTypes.button,
      width: "15%",
    },
    {
      title: "Remove from plan",
      field: "details",
      dataField: "name",
      action: "createRemoveBtn",
      type: columnTypes.button,
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
      type: columnTypes.cell,
      width: "10vw",
    },
    {
      title: "Exercise Name",
      field: "name",
      type: columnTypes.cell,
      width: "30vw",
    },
    {
      title: "Muscle group",
      field: "muscleGroup",
      type: columnTypes.cell,
      width: "30vw",
    },
    {
      title: "Action",
      field: "action",
      dataField: "id",
      action: "createEditAndDeleteBtn",
      type: columnTypes.button,
      width: "30vw",
    },
  ];
}
export function buildExerciseColumnsInUserPage() {
  return [
    {
      title: "ID",
      field: "id",
      type: columnTypes.cell,
      width: "10%",
    },
    {
      title: "Exercise Name",
      field: "name",
      type: columnTypes.cell,
      width: "30%",
    },
    {
      title: "Muscle group",
      field: "muscleGroup",
      type: columnTypes.cell,
      width: "20%",
    },
    {
      title: "Difficulty",
      field: "difficulty",
      type: columnTypes.cell,
      width: "20%",
    },
    {
      title: "Action",
      field: "action",
      dataField: "id",
      action: "createAddAndDetailsBtn",
      type: columnTypes.button,
      width: "20%",
    },
  ];
}

export function buildUserColumns() {
  return [
    {
      title: "User",
      field: ["profilePicture", "name"],
      type: columnTypes.cellWithProfilePicture, //picture + data
      width: "50vw",
    },
    {
      title: "Email",
      field: "email",
      type: columnTypes.cell,
      width: "30vw",
    },
    {
      title: "Profile",
      field: "action",
      dataField: "id",
      action: "createUserDetailsBtn",
      type: columnTypes.button,
      width: "20vw",
    },
  ];
}

export function buildUserColumnInAdminPanel() {
  return [
    {
      title: "ID",
      field: "id",
      type: columnTypes.cell,
      width: "30%", //(some size -> px, %, rem...),
    },
    {
      title: "Email",
      field: "email",
      type: columnTypes.cell,
      width: "20%", //(some size -> px, %, rem...),
    },
    {
      title: "Role",
      field: "role",
      options: ["User", "Administrator"],
      dataField: "id",
      type: columnTypes.dropdownEditable,
      width: "30%", //(some size -> px, %, rem...),
    },
    {
      title: "Action",
      field: "action",
      dataField: "id", //since we need user id for this action we add one extra property
      action: "createUserDetailsBtn", //this property will help when creating the button
      type: columnTypes.button,
      width: "10%", //(some size -> px, %, rem...),
    },
  ];
}
