import { Fragment } from "react";
import DangerBtn from "../button/DangerBtn";
import PrimaryBtn from "../button/PrimaryBtn";
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
      <header>
        <h2>Some header</h2>
        <CloseBtn onClick={props.onConfirm} />
      </header>
      <main className={styles["modal-main"]}>{props.children}</main>
      <footer className="d-flex justify-content-between">
        <PrimaryBtn action={props.onConfirm} content="Save" />
        <DangerBtn action={props.onCancel} content="Cancel" />
      </footer>
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
        ></ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
}
export { Modal };
