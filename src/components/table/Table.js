import styles from "./table.module.css";
/**
 * @param { data={data that will be displayed on the cells}
 *          columns={table's columns with info}
 *          actions={object with callback functions that we use when creating a button or s.th. }}
 *
 * @returns {table}
 */
function Table(props) {
  /**
   * @param { data that will be displayed in column with type 'cell',
   * for example userId, email etc.} data
   *
   * @returns { cell with data/text or button with action,
   *  for example 'user details' btn that will redirect to user details page }
   */
  const cellLoader = (data) => {
    // iterate column times, so we can create columns with actions too, not only text-data
    return props.columns.map((column) => {
      // first if check will create all cells with normal text data in it
      if (column.type === "cell") {
        return <td>{data[column.field]}</td>;
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
          {props.columns.map((column) => {
            return (
              <th key={column.field} style={{ width: column.width }}>
                {column.title}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {props.data.map((current) => {
          return <tr key={current.id}>{cellLoader(current)}</tr>;
        })}
      </tbody>
    </table>
  );
}
export default Table;
