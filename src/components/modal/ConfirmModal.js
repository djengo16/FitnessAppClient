import { Fragment } from "react";
import DangerBtn from "../button/DangerBtn";
import PrimaryBtn from "../button/PrimaryBtn";
import CloseBtn from "../close/CloseBtn";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
const portalElement = document.getElementById("overlays");

function ConfirmBackdrop(props) {
  return (
    <div
      className={`${styles.backdrop} ${styles["modal-confirm-backdrop"]}`}
      onClick={props.onConfirm}
    />
  );
}
function ConfirmModalOverlay(props) {
  return (
    <div className={styles["confirm-modal"]}>
      <header className="d-flex justify-content-between">
        <label className={`${styles["modal-action-label"]} align-self-start`}>
          {props.action}
        </label>
        <CloseBtn onClick={props.onCancel} />
      </header>
      <main className={styles["modal-confirm-main"]}>
        <p className={styles["modal-message"]}>{props.message}</p>
      </main>
      <footer className="d-flex justify-content-between align-items-end">
        <PrimaryBtn action={props.onConfirm} content="Yes" />
        <DangerBtn action={props.onCancel} content="No" />
      </footer>
    </div>
  );
}

function ConfirmModal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ConfirmBackdrop onConfirm={props.onConfirm} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ConfirmModalOverlay
          action={props.action}
          onConfirm={props.onConfirm}
          onCancel={props.onCancel}
        />,
        portalElement
      )}
    </Fragment>
  );
}
export { ConfirmModal };
