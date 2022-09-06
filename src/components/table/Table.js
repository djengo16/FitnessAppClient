import { useEffect } from "react";
import styles from "./table.module.css";
import eFilterStyles from "../exercises/exercise-filter.module.css";
import btnStyles from "../button/button.module.css";
import { columnTypes } from "../../utils/constants";

/**
 * @param { data={data that will be displayed on the cells}
 *          columns={table's columns with info}
 *          actions={object with callback functions that we use when creating a button or s.th. }}
 *
 * @returns {table}
 */
function Table(props) {
  useEffect(() => {}, [props.columns, props.data]);

  const handleCellChange = (e) => {
    const saveBtn = e.target.nextElementSibling;
    saveBtn.classList.remove(styles["save-btn-hidden"]);
  };

  const handleSaveCellData = (e, data) => {
    const btn = e.target;
    btn.classList.add(styles["save-btn-hidden"]);

    //the select option vlaue
    const selectedValue = btn.previousElementSibling.value;
    props.handleSaveData(selectedValue, data);
  };

  /**
   * @param { data that will be displayed in column with type 'cell',
   * for example userId, email etc.} data
   *
   * @returns { cell with data/text or button with action,
   *  for example 'user details' btn that will redirect to user details page }
   */
  const cellLoader = (data, index) => {
    // iterate column times, so we can create columns with actions too, not only text-data
    return props.columns.map((column) => {
      // first if check will create all cells with normal text data in it
      if (column.type === columnTypes.cell) {
        return <td>{data[column.field]}</td>;
      } else if (column.type === columnTypes.cellWithProfilePicture) {
        return (
          <td>
            {data.profilePicture ? (
              <div className={styles["cell-with-img"]}>
                <img
                  className={styles["cell-img"]}
                  alt="profile"
                  src={data.profilePicture}
                ></img>

                <p>{data[column.field[1]]}</p>
              </div>
            ) : (
              <div className={styles["cell-with-img"]}>
                <img
                  className={styles["cell-img"]}
                  alt="profile"
                  src="./user-icon.svg"
                ></img>

                <p>{data[column.field[1]]}</p>
              </div>
            )}
          </td>
        );
      } else if (column.type === columnTypes.numericEditable) {
        /**
         * In this cell we can edit the numeric value, after we receive
         * true for the 'editig' props. When editing is true two buttons
         * are displayed next to the numeric value. A button with plus
         * and another one with minus. These buttons can modify the
         * value in the current ceel.
         */
        if (props.editing) {
          return (
            <td>
              <div className={styles["editable-cell"]}>
                <span>{data[column.field]}</span>
                <div className={styles.actions}>
                  <button onClick={() => props.onDecrease(column.field, index)}>
                    −
                  </button>
                  <button onClick={() => props.onIncrease(column.field, index)}>
                    +
                  </button>
                </div>
              </div>
            </td>
          );
        } else {
          return <td>{data[column.field]}</td>;
        }
      } else if (column.type === columnTypes.dropdownEditable) {
        /**
         * Cell with dropdown and update logic
         * For example Admin role -> we have 2 options
         * when the selected value changes, a Save button is displayed
         * right to the dropdown. Save triggers api call and updates the value
         * on the server and on the client.
         *  */
        return (
          <td>
            <div>
              <select
                onChange={handleCellChange}
                className={eFilterStyles["exercise-filter-select"]}
              >
                {column.options.map((opt) => {
                  if (opt === data[column.field]) {
                    return <option selected>{opt}</option>;
                  }
                  return <option>{opt}</option>;
                })}
              </select>
              <button
                className={`${styles["save-btn-hidden"]} ${btnStyles[`btn`]} ${
                  btnStyles["btn-secondary"]
                }`}
                onClick={(e) => handleSaveCellData(e, data)}
              >
                Save
              </button>
            </div>
          </td>
        );
      } else {
        /**
         * This check returns cell with button, (user details/delete/edit button) that is associated with the current row's data.
         * For now we have details button which job is to redirect us to current row's user 'page' wtih his account details.
         * We get from props.actions (object with callback functions that creates specific component )
         * the function that matches current column.action property and pass the needed data to the function.
         * After the function is executed it returns a button with specific action.
         * This code {props.actions[column.action](data[column.dataField])} => equals to something
         * like  actions.createUserDetailsButton(userId) => and returns <UserDetailsButton id={userId} content='Go to'/>,
         */
        return <td>{props.actions[column.action](data[column.dataField])}</td>;
      }
    });
  };

  return (
    <table className={styles["table"]}>
      <thead className={styles["head"]}>
        <tr>
          {props.columns &&
            props.columns.map((column) => {
              return (
                <th key={column.field} style={{ width: column.width }}>
                  {column.title}
                </th>
              );
            })}
        </tr>
      </thead>
      <tbody>
        {props.data &&
          props.data.map((current, index) => {
            return <tr key={current.id}>{cellLoader(current, index)}</tr>;
          })}
      </tbody>
    </table>
  );
}
export default Table;
