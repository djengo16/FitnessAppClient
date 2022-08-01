import { Fragment } from "react";
import CloseBtn from "../close/CloseBtn";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";

const portalElement = document.getElementById("overlays");

function Backdrop(props) {
  return (
    <div
      className={`${styles.backdrop} ${styles["modal-backdrop"]}`}
      onClick={props.onConfirm}
    />
  );
}
function ModalOverlay(props) {
  return (
    <div className={styles.modal}>
      <header className={styles["modal-header"]}>
        <h4 className={styles["modal-title"]}>{props.title}</h4>
        <CloseBtn onClick={props.onConfirm} />
      </header>
      <main className={styles["modal-main"]}>{props.children}</main>
    </div>
  );
}

function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onConfirm={props.onConfirm}
          onCancel={props.onCancel}
          children={props.children}
          title={props.title}
        ></ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
}
export { Modal };
