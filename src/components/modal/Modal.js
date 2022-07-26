import { Fragment } from "react";
import CloseBtn from "../close/CloseBtn";
import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import Button from "../button/Button";


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
        <Button
          onClick={props.onConfirm}
          buttonStyle="btn-primary"
          buttonSize="btn-large"
        >
          Save
        </Button>
        <Button
          onClick={props.onCancel}
          buttonStyle="btn-danger"
          buttonSize="btn-large"
        >
          Cancel
        </Button>

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
