import tableStyles from "./table.module.css";
import wrapperStyles from "./table-wrapper.module.css";
const TableAlikeWrapper = (props) => {
  return (
    <div className={wrapperStyles["t-wrapper"]}>
      <div className={tableStyles["head"]}>
        <p className={wrapperStyles["t-wrapper-title"]}>{props.title}</p>
      </div>
      <div className={wrapperStyles["t-wrapper-main"]}>{props.children}</div>
    </div>
  );
};
export default TableAlikeWrapper;
